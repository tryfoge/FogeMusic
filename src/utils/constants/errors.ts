import Plugin from "../../structures/Plugin";
import Track from "../../structures/Track";

export class SearchError extends Error {
    public constructor(plugin: Plugin<Track>, message: string) {
        super()
        this.message = `[Error]: {${plugin.constructor.name}} ${message}`
    }
}