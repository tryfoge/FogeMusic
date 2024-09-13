import { NativeFunction, Return } from "@tryforge/forgescript";

export default new NativeFunction({
    name: "$trackStop",
    description: "Stops the currently playing track",
    version: 'v0.0.1',
    unwrap: false,
    async execute(ctx) {
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        if (node) {
            node.stop();
            return Return.success('Track stopped');
        }
        return Return.error('No node found');
    }
});
