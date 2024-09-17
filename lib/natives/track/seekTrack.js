const { ArgType, NativeFunction, Return } = require("@tryforge/forgescript");

module.exports = new NativeFunction({
    name: "$seekTrack",
    description: "Seek to a specific position in the currently playing track",
    version: 'v0.0.1',
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "position",
            description: "The position to seek to (in seconds)",
            type: ArgType.Number,
            rest: false,
            required: true
        }
    ],
    async execute(ctx, [position]) {
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        if (node) {
            node.seek(position * 1000); // Position in milliseconds
            return Return.success('Seek successful');
        }
        return Return.error('No node found');
    }
});
