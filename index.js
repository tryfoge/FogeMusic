const { ForgeClient } = require("forgescript")
const { AudioPlayer, Youtube } = require("./lib")
const { joinVoiceChannel } = require("@discordjs/voice")

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
        resource.source.on("progress", (chunk, cache, length) => console.log(`Segment size: ${chunk}\nDownloaded: ${cache}\nContent-Lengt: ${length}`))
        if (! resource) {
            console.log('no resource')
            return
        }

        voiceAudioPlayer.play(resource)
    }
})

// console.log(process.env.TOKEN)
client.login(process.env.TOKEN)