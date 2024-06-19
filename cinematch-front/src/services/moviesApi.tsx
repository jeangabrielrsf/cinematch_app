import api from "@/services/tmdbApi";
export async function getPopularMovies(page: number = 1) {
    const response = await api.get(`movie/popular?language=pt-BR&page=${page}`);
    return response.data;
}

export async function searchAContent(query: string) {
    const response = await api.get(
        `search/multi?query=${query}&language=pt-BR`
    );
    return response.data;
}

export async function getMovieWatchProvider(id: number) {
    const response = await api.get(`movie/${id}/watch/providers`);
    return response.data;
}
