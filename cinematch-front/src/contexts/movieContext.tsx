import { createContext, Dispatch, SetStateAction } from "react";

interface MovieContextType {
    popularMovies: any[];
    setPopularMovies: Dispatch<SetStateAction<[]>>;
}

const MoviesContext = createContext<MovieContextType | undefined>(undefined);

export default MoviesContext;
