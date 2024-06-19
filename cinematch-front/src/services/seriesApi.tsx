import api from "@/services/tmdbApi";

export async function getPopularSeries(page: number = 1) {
    const response = await api.get(`tv/popular?language=pt-BR&page=${page}`);
    return response.data;
}

export async function getSerieWatchProvider(id: number) {
    const response = await api.get(`tv/${id}/watch/providers`);
    return response.data;
}
