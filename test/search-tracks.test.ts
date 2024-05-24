import { Youtube } from "../src"

async function main() {
    const youtube = new Youtube()
    const result = youtube.search({ query: "Binah Theme 3" })

    await result.complete
    console.log('Type', result.type)
    console.log('Tracks', result.tracks.map(x => x.get("title")))
}

main()