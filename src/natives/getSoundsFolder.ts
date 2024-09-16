import { NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
    name: "$getSoundsFolder",
    description: "Returns the sounds directory folder specified in options",
    version: 'v0.0.1',
    unwrap: false,
    async execute(ctx) {
        return this.success(ctx.client.music.options.soundsFolder);
    }
});