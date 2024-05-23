export interface QuerySearch { query: string }
export interface IdentifierSearch { sourceId: string }
export interface PlaylistSearch { listId: string }

interface SearchOptionsBase {
    category?: "track" | "playlist"
    limit?: number
}

export type SearchOptions = SearchOptionsBase & (
    QuerySearch |
    IdentifierSearch |
    PlaylistSearch
)