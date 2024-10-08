const { ArgType, NativeFunction, Return } = require("@tryforge/forgescript");

module.exports = new NativeFunction({
    name: "$filterTrack",
    description: "Apply an audio filter to the currently playing track",
    version: 'v0.0.1',
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "filter",
            description: "The audio filter to apply",
            type: ArgType.String,
            rest: false,
            required: true
        }
    ],
    async execute(ctx, [filter]) {
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        if (node) {
            node.applyFilter(filter);
            return Return.success('Filter applied');
        }
        return Return.error('No node found');
    }
});
