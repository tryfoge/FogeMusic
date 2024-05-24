import { SearchError } from "../utils/constants/errors"
import { ResultTypes } from "../utils/constants/search-enums"
import { Result, ResultType } from "../utils/types/search"
import Plugin from "./Plugin"
import Track from "./Track"

class Search<T extends Track> {
    #type: ResultType
    #error: Error
    #completeSignal: Promise<void>
    public readonly plugin: Plugin<T>
    public readonly tracks: Array<T> = []
    public constructor(plugin: Plugin<T>, response: Promise<Result>) {
        this.plugin = plugin
        this.#completeSignal = this.handlePromisedResult(response)
    }

    private handlePromisedResult(promise: Promise<Result>) {
        return new Promise<void>(async (resolve) => {
            const result = await promise.catch<Error>((err) => err)

            if (result instanceof Error) {
                this.onResultError(result)
            } else {
                this.onResultComplete(result)
            }
            resolve()
        })
    }

    private onResultComplete(result: Result): void {
        this.#type = result.type

        switch (result.type) {
            case "search": {
                this.tracks.push(...result.data.map(x => this.plugin.buildTrack(x)))
            }
            break;
            case "track": {
                this.tracks.push(this.plugin.buildTrack(result.data))
            }
            break;
            case "error": {
                this.#error = new SearchError(this.plugin, result.data.message)
            }
            break;
        }
    }

    private onResultError(err: Error) {
        this.#type = ResultTypes.Error
        this.#error = new SearchError(this.plugin, err.message)
    }

    public get type() { return this.#type }
    public get complete() { return this.#completeSignal }
    public get error() { return this.#error }
}

export default Search