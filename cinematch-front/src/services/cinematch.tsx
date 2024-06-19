import backApi from "@/services/backApi";
import { MovieData, SerieData } from "@/utils/contentUtils";

export async function likeAMovie(token: string, data: MovieData) {
    const response = await backApi.post("/movies/", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function likeASerie(token: string, data: SerieData) {
    const response = await backApi.post("/series/", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function getUserLikedMovies(token: string) {
    const response = await backApi.get("/movies/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getUserLikedSeries(token: string) {
    const response = await backApi.get("/series/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getMovieRecommendations(token: string) {
    const response = await backApi.get("/movies/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getSerieRecommendations(token: string) {
    const response = await backApi.get("/series/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
