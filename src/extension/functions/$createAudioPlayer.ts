import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";

export default new NativeFunction({
    name: "$createAudioPlayer",
    description: "Creates a new Audio player with id if one doesn't exists.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "id",
            description: "The id that will be assigned to the Audio player",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    execute(ctx, [id]) {
        const harmony = ctx.client.music.harmony;
        if (harmony.harmonyNodes.has(id))
            return new Return(ReturnType.Success, false);
        harmony.createAudioPlayer(id);

        return new Return(ReturnType.Success, true);
    }
})