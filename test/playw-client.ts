import { joinVoiceChannel } from "@discordjs/voice";
import { ForgeClient } from "forgescript";
import { Youtube } from "../src";
import AudioPlayer from "../src/structures/AudioPlayer";

const client = new ForgeClient({
    intents: ["Guilds", "GuildMessages", "GuildVoiceStates", "MessageContent"],
    prefixes: ["co"],
    events: ["ready"]
});

const youtube = new Youtube()
const voiceAudioPlayer = new AudioPlayer()

client.on('messageCreate', async (m) => {
    if (! m.inGuild()) return

    if (m.content === "cotest") {
        joinVoiceChannel({
            channelId: "1089045215626670100",
            guildId: m.guildId,
            adapterCreator: m.guild.voiceAdapterCreator
        })

        const search = youtube.search({ query: "Binah Theme 3" })
        await search.complete

        const track = search.tracks[0]
        const resource = await youtube.createResource(track)
        if (! resource) {
            console.log('no resource')
            return
        }

        voiceAudioPlayer.play(resource)
    }
})

client.login(process.env.TOKEN)