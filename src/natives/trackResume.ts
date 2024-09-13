import { NativeFunction, Return } from "@tryforge/forgescript";

export default new NativeFunction({
    name: "$trackResume",
    description: "Resumes the currently paused track",
    version: 'v0.0.1',
    unwrap: false,
    async execute(ctx) {
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        if (node) {
            node.resume();
            return Return.success('Track resumed');
        }
        return Return.error('No node found');
    }
});
