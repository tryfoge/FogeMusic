"use strict";

class ResourceCache {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Caches a resource.
     * @param {string} key The key to store the resource under.
     * @param {any} resource The resource to cache.
     */
    cacheResource(key, resource) {
        this.cache.set(key, resource);
    }

    /**
     * Retrieves a cached resource.
     * @param {string} key The key to retrieve the resource from.
     * @returns {any|undefined} The cached resource or undefined if not found.
     */
    getResource(key) {
        return this.cache.get(key);
    }

    /**
     * Clears all cached resources.
     */
    clearCache() {
        this.cache.clear();
    }
}

module.exports = ResourceCache;
