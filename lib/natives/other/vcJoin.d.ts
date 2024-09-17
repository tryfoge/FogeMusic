import { ArgType, NativeFunction } from "@tryforge/forgescript";
import type { GuildChannel } from "discord.js";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Channel;
    rest: false;
    required: true;
    check: (i: GuildChannel) => boolean;
}], true>;
export default _default;
