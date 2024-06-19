import MovieContent from "@/components/MovieContent/MovieContent";
import SerieContent from "@/components/SerieContent/SerieContent";
import UserTokenContext from "@/contexts/authContext";
import { getUserLikedMovies, getUserLikedSeries } from "@/services/cinematch";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

export default function UserFavorites() {
    const [likedMovies, setLikedMovies] = useState([]);
    const [likedSeries, setLikedSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userToken } = useContext(UserTokenContext);

    const fetchLikedMovies = useCallback(async () => {
        const data = await getUserLikedMovies(userToken);
        setLikedMovies(data.liked_movies);
    }, []);

    const fetchLikedSeries = useCallback(async () => {
        const data = await getUserLikedSeries(userToken);
        setLikedSeries(data.liked_series);
    }, []);

    useEffect(() => {
        fetchLikedMovies().catch(console.error);
        fetchLikedSeries().catch(console.error);
        setLoading(false);
    }, [fetchLikedMovies, fetchLikedSeries]);

    return (
        <>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    color="#fff"
                    justifyContent="center"
                    display="flex"
                >
                    Seus filmes favoritos
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {loading ? (
                        <CircularProgress />
                    ) : likedMovies.length === 0 ? (
                        <Box margin={"30px 0"}>
                            <Typography variant="h6" color="#fff">
                                Você ainda não curtiu nenhum filme :C
                            </Typography>
                        </Box>
                    ) : (
                        likedMovies.map((movie, index) => {
                            return (
                                <Grid item key={index}>
                                    <MovieContent
                                        movie={movie}
                                        tmdb_id={movie.tmdb_id}
                                    />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    color="#fff"
                    justifyContent="center"
                    display="flex"
                >
                    Seus seriados favoritos
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {loading ? (
                        <CircularProgress />
                    ) : likedSeries.length === 0 ? (
                        <Box margin={"30px 0"}>
                            <Typography variant="h6" color="#fff">
                                Você ainda não curtiu nenhum seriado :C
                            </Typography>
                        </Box>
                    ) : (
                        likedSeries.map((serie, index) => {
                            return (
                                <Grid item key={index}>
                                    <SerieContent
                                        serie={serie}
                                        tmdb_id={serie.tmdb_id}
                                    />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
        </>
    );
}
