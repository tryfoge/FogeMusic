export class ResourceCache {
    private cache: Map<string, any>;

    constructor();

    /**
     * Caches a resource.
     * @param key The key to store the resource under.
     * @param resource The resource to cache.
     */
    cacheResource(key: string, resource: any): void;

    /**
     * Retrieves a cached resource.
     * @param key The key to retrieve the resource from.
     * @returns The cached resource or undefined if not found.
     */
    getResource(key: string): any | undefined;

    /**
     * Clears all cached resources.
     */
    clearCache(): void;
}
