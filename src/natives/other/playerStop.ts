import { NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
    name: "$playerStop",
    description: "Instructs the Audio player to stop from playing music",
    version: 'v0.0.1',
    unwrap: false,
    async execute(ctx) {
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        node.stop();

        return this.success(true);
    }
});