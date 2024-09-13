"use strict";
const { NativeFunction, Return } = require("@tryforge/forgescript");

module.exports = new NativeFunction({
    name: "$resumeTrack",
    description: "Resumes the currently paused track",
    version: 'v0.0.1',
    unwrap: false,
    async execute(ctx) {
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        node.resume();

        return Return.success(true);
    }
});
