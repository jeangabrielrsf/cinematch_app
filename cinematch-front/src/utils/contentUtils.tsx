export interface MovieData {
    id?: number;
    title: string;
    overview: string;
    tmdb_id: number;
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    release_date: string;
}

export interface SerieData {
    id?: number;
    name: string;
    overview: string;
    tmdb_id: number;
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    first_air_date: string;
}
