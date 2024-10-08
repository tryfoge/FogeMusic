import { NativeFunction, Return } from "@tryforge/forgescript";

export default new NativeFunction({
    name: "$trackPause",
    description: "Pauses the currently playing track",
    version: 'v0.0.1',
    unwrap: false,
    async execute(ctx) {
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        if (node) {
            node.pause();
            return this.success('Track paused');
        }
        return this.error('No node found');
    }
});
