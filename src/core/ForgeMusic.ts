import { ForgeClient, ForgeExtension, FunctionManager } from "@tryforge/forgescript";
import { Providers, MusicManager } from "naoko-player";
import path from "node:path";

interface MusicExtensionOptions {
    soundsFolder?: string;
    defaultProvider?: string;
    addLocalProvider?: boolean;
}

class ForgeMusic extends ForgeExtension {
    name: string = 'ForgeMusic';
    description: string = 'A standard music extension library for forgescript';
    version: string = 'v1.0.0';

    public manager = new MusicManager({ providers: [] });
    public options = ForgeMusic.buildBaseOptions();
    public constructor(options: MusicExtensionOptions) {
        super();
        this.options = { ...this.options, ...options };
    }
    
    init(client: ForgeClient): void {
        this.load(__dirname + "/natives");

        client['music'] = this;
        
        if (this.options.addLocalProvider) {
            this.addProvider(new Providers.LocalProvider());
        }
    }

    addProvider(provider: Providers.Provider) {
        this.manager.providers.set(provider.provider, provider);
    }

    public get registeredProviders() {
        return Array.from(this.manager.providers.keys());
    }

    static buildBaseOptions(): MusicExtensionOptions {
        return {
            soundsFolder: path.join(process.cwd(), 'sounds'),
            defaultProvider: 'local',
            addLocalProvider: true
        }
    }
}

declare module 'discord.js' {
    interface Client {
        music: ForgeMusic;
    }
}

export = ForgeMusic