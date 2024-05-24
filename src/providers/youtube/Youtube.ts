import yts from "yt-search";
import Plugin from "../../structures/Plugin";
import Track from "../../structures/Track";
import { deserialize, serialize } from "../../utils/constants/track-info";
import { SearchOptions } from "../../utils/types/plugin";
import { TrackInfo } from "../../utils/validators/track";
import { ResultSearch, ResultTrack } from "../../utils/types/search";
import Search from "../../structures/Search";
import ytdl from "ytdl-core";
import Resource from "../../structures/Resource";
import { FFmpeg, opus } from "prism-media";

// Move this somewhere else lmao
const FFMPEG_ARGS = [
    "-f",
    "s16le",
    "-ar",
    "48000",
    "-ac",
    "2",
    "-vn"
  ]

class Youtube extends Plugin<Track> {
    public readonly name = this.constructor.name
    public readonly description = ""
    public readonly version = "0.0.0"

    public encodeTrack(track: Track) {
        return Buffer.from(serialize(track['_data'])).toString("base64")
    }

    public decodeTrack(encoded: string) {
        return new Track(deserialize(encoded))
    }

    public buildTrack(metadata: TrackInfo): Track {
        return new Track(metadata)
    }

    public async createResource(track: Track) {
        function getOpusFormat (format: ytdl.videoFormat) {
            return format.codecs === "opus" &&
                format.container === "webm" &&
                format.audioSampleRate === "48000"
        }

        function getOtherFormat (formats: ytdl.videoFormat[], isLive: boolean) {
            const noVideo = (format: ytdl.videoFormat) => !format.hasVideo
            const findFormat = (format: ytdl.videoFormat) => 
                    isLive ? (format.hasAudio && format.isHLS) : format.hasAudio

            const supportedFormats = formats.filter(findFormat)
            const noVideoFormat = supportedFormats.find(noVideo)

            return noVideoFormat || supportedFormats.at(0)
        }

        const info = await ytdl.getInfo(track.get("sourceUrl"))
        const isPlayable = info.player_response.playabilityStatus === undefined ||
            !['UNPLAYABLE', 'LOGIN_REQUIRED'].includes(info.player_response.playabilityStatus.status)

        if (! isPlayable) {
            throw new Error('f')
        }

        const opusFormat = info.formats.find(getOpusFormat)
        if (opusFormat) {
            console.log("Returning opus format")
            return new Resource({
                track,
                source: ytdl.downloadFromInfo(info, { format: opusFormat }),
                demuxer: new opus.WebmDemuxer(),
                decoder: Resource.createOpusDecoder()
            })
        }

        const otherFormat = getOtherFormat(info.formats, info.videoDetails.isLiveContent)
        if (otherFormat) {
            console.log("Returning available format")
            return new Resource({
                track,
                source: ytdl.downloadFromInfo(info, { format: otherFormat }),
                decoder: new FFmpeg({ args: FFMPEG_ARGS })
            })
        }
    }

    public search(options: SearchOptions): Search<Track> {
        if ("sourceId" in options) {
            return new Search(this, this.searchVideo(options.sourceId))
        }

        if ("query" in options) {
            return new Search(this, this.searchQuery(options))
        }
    }

    private async searchVideo(videoId: string): Promise<ResultTrack> {
        const info = await yts.search({ videoId })
        return {
            type: "track",
            data: this.buildTrackInfo(info)
        }
    }

    private async searchQuery(options: SearchOptions & { query: string }): Promise<ResultSearch> {
        const info = await yts.search({ query: options.query })

        return {
            type: "search",
            data: info.videos.map(x => this.buildTrackInfo(x))
        }
    }

    private buildTrackInfo(info: yts.VideoMetadataResult | yts.VideoSearchResult): TrackInfo {
        return {
            title: info.title,
            description: info.description,
            duration: info.duration.seconds,
            isStream: false,
            sourceId: info.videoId,
            sourceUrl: info.url,
            sourceName: this.name,
            author: info.author,
            artworkUrl: info.thumbnail
        }
    }
}

export default Youtube