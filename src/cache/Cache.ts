import { Transform } from "stream"

class Cache extends Transform {
    public readonly cacheId: string
    public constructor(id: string) {
        super()
        this.cacheId = id
    }
}

export default Cache