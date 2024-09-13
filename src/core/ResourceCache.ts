import { Cache } from "naoko-player";

export class ResourceCache {
    private cache: Map<string, any> = new Map();

    /**
     * Caches a resource.
     * @param key The key to store the resource under.
     * @param resource The resource to cache.
     */
    cacheResource(key: string, resource: any): void {
        this.cache.set(key, resource);
    }

    /**
     * Retrieves a cached resource.
     * @param key The key to retrieve the resource from.
     * @returns The cached resource or undefined if not found.
     */
    getResource(key: string): any | undefined {
        return this.cache.get(key);
    }

    /**
     * Clears all cached resources.
     */
    clearCache(): void {
        this.cache.clear();
    }
}
