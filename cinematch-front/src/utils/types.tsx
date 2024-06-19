import { MovieData, SerieData } from "./contentUtils";

export interface FormJsonData {
    username?: string;
    email: string;
    password: string;
}

export interface WatchProviders {
    provider_name: string;
    logo_path: string;
}

export interface SerieContentProps {
    serie: SerieData;
    tmdb_id?: number;
}

export interface MovieContentProps {
    movie: MovieData;
    tmdb_id?: number;
}
