const { ArgType, NativeFunction, Return } = require("@tryforge/forgescript");

const queue = new Map(); // Map to store track queues by guild ID

module.exports = new NativeFunction({
    name: "$trackQueue",
    description: "Manages the track queue for the specified guild",
    version: 'v0.0.1',
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "action",
            description: "The action to perform on the queue (add, remove, view, clear)",
            type: ArgType.String,
            rest: false,
            required: true
        },
        {
            name: "track encoded id",
            description: "The track's encoded ID to add or remove from the queue",
            type: ArgType.String,
            rest: false,
            required: false
        }
    ],
    async execute(ctx, [action, encodedId]) {
        const guildId = ctx.guild.id;
        if (!queue.has(guildId)) queue.set(guildId, []);
        const guildQueue = queue.get(guildId);

        switch (action) {
            case 'add':
                if (encodedId) guildQueue.push(encodedId);
                return Return.success(guildQueue);

            case 'remove':
                if (encodedId) {
                    const index = guildQueue.indexOf(encodedId);
                    if (index > -1) guildQueue.splice(index, 1);
                }
                return Return.success(guildQueue);

            case 'view':
                return Return.success(guildQueue);

            case 'clear':
                queue.set(guildId, []);
                return Return.success(guildQueue);

            default:
                return Return.error('Invalid action');
        }
    }
});
