import MovieContent from "@/components/MovieContent/MovieContent";
import SerieContent from "@/components/SerieContent/SerieContent";
import UserTokenContext from "@/contexts/authContext";
import {
    getMovieRecommendations,
    getSerieRecommendations,
} from "@/services/cinematch";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Recommendations() {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [recommendedSeries, setRecommendedSeries] = useState([]);
    const [loadingSeries, setLoadingSeries] = useState(true);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const context = useContext(UserTokenContext);

    const { userToken } = context;

    const fecthRecommendedMovies = useCallback(async () => {
        const data = await getMovieRecommendations(userToken);
        setRecommendedMovies(data);
        setLoadingMovies(false);
    }, [userToken]);

    const fetchRecommendedSeries = useCallback(async () => {
        const data = await getSerieRecommendations(userToken);
        setRecommendedSeries(data);
        setLoadingSeries(false);
    }, [userToken]);

    useEffect(() => {
        fecthRecommendedMovies().catch(console.error);
        fetchRecommendedSeries().catch(console.error);
    }, [fetchRecommendedSeries, fecthRecommendedMovies]);

    return (
        <>
            <Box sx={{ padding: "10px" }}>
                <Typography
                    variant="h2"
                    justifyContent="center"
                    display="flex"
                    color="#fff"
                >
                    Recomendações de filmes
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {loadingMovies ? (
                        <Box marginTop={"30px"}>
                            <CircularProgress size={50} />
                        </Box>
                    ) : recommendedMovies.length === 0 ? (
                        <Box margin={"30px 0"}>
                            <Typography variant="h6" color={"#fff"}>
                                Adicione filmes aos favoritos!
                            </Typography>
                        </Box>
                    ) : (
                        recommendedMovies.map((movie, index) => {
                            return (
                                <Grid item key={index}>
                                    <MovieContent movie={movie} />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
            <Box>
                <Typography
                    variant="h2"
                    justifyContent="center"
                    display="flex"
                    color="#fff"
                >
                    Recomendações de seriados
                </Typography>
                <Grid container spacing={3} justifyContent={"center"}>
                    {loadingSeries ? (
                        <Box marginTop={"30px"}>
                            <CircularProgress size={50} />
                        </Box>
                    ) : recommendedSeries.length === 0 ? (
                        <Box margin={"30px 0"}>
                            <Typography variant="h6" color={"#fff"}>
                                Adicione seriados aos favoritos!
                            </Typography>
                        </Box>
                    ) : (
                        recommendedSeries.map((serie, index) => {
                            return (
                                <Grid item key={index}>
                                    <SerieContent serie={serie} />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
        </>
    );
}
