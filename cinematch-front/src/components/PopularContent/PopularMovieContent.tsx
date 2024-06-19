import {
    ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { getPopularMovies } from "@/services/moviesApi";
import MovieContent from "../MovieContent/MovieContent";
import styled from "styled-components";
import MoviesContext from "@/contexts/movieContext";
import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Pagination,
    Stack,
} from "@mui/material";
import { MovieData } from "@/utils/contentUtils";

export default function PopularMovieContent() {
    const moviesContext = useContext(MoviesContext);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchMoviesData = useCallback(async () => {
        setLoading(true);
        const data = await getPopularMovies(page);
        moviesContext.setPopularMovies(data.results);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchMoviesData().catch(console.error);
    }, [fetchMoviesData]);

    function handlePage(event: ChangeEvent<unknown>, value: number) {
        console.log(event);
        setPage(value);
    }
    return (
        <Container>
            <Grid container columns={4}>
                <MoviesContainer>
                    {loading ? (
                        <Box display={"flex"} justifyContent={"center"}>
                            <CircularProgress
                                size={40}
                                sx={{ margin: "5px auto" }}
                            />
                        </Box>
                    ) : (
                        moviesContext.popularMovies.map(
                            (movie: MovieData, index) => {
                                return (
                                    <MovieContent key={index} movie={movie} />
                                );
                            }
                        )
                    )}
                </MoviesContainer>
            </Grid>
            <Stack spacing={0}>
                <Pagination
                    onChange={handlePage}
                    variant="outlined"
                    color="custom"
                    count={20}
                    size="large"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                ></Pagination>
            </Stack>
        </Container>
    );
}

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
