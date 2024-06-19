import UserTokenContext from "@/contexts/authContext";
import { getUserLikedMovies, likeAMovie } from "@/services/cinematch";
import { getMovieWatchProvider } from "@/services/moviesApi";
import { MovieData } from "@/utils/contentUtils";
import { MovieContentProps, WatchProviders } from "@/utils/types";
import { CalendarMonth, LocalMovies, StarRate } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import styled from "styled-components";

export default function MovieContent({ movie, tmdb_id }: MovieContentProps) {
    const [openInfo, setOpenInfo] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackStatus, setSnackStatus] = useState<string>("");
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [watchProviders, setWatchProviders] = useState<
        WatchProviders[] | undefined
    >([]);
    const releaseDate = dayjs(movie.release_date).format("DD/MM/YYYY");
    const userToken = useContext(UserTokenContext).userToken;

    function handleOpenDialog() {
        handleMovieProviders();
        isMovieFavorited();
        setOpenInfo(true);
    }

    function handleCloseDialog() {
        setOpenInfo(false);
    }

    function handleSnackBarOpen(status: string) {
        setSnackStatus(status);
        setOpenSnack(true);
    }

    function handleSnackBarClose() {
        setOpenSnack(false);
    }

    async function isMovieFavorited() {
        const data = await getUserLikedMovies(userToken);
        const likedMovies = data.liked_movies;
        console.log(movie);
        for (const likedMovie of likedMovies) {
            if (likedMovie.title == movie.title) setIsLiked(true);
        }
    }

    async function handleLikeMovie() {
        if (!userToken) {
            return;
        }
        const movieData: MovieData = {
            title: movie.title,
            overview: movie.overview,
            tmdb_id: movie.id,
            popularity: movie.popularity,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
        };
        try {
            await likeAMovie(userToken, movieData);
            handleSnackBarOpen("success");
        } catch (error) {
            console.error(error);
            handleSnackBarOpen("error");
        }
    }

    async function handleMovieProviders() {
        setLoading(true);
        let data;
        try {
            if (tmdb_id) {
                data = await getMovieWatchProvider(tmdb_id);
            } else {
                data = await getMovieWatchProvider(movie.id);
            }
            console.log(data.results.BR?.flatrate);
            const providers = data.results.BR?.flatrate;
            setWatchProviders(providers);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <>
            <Box onClick={handleOpenDialog}>
                <MoviePoster>
                    <img
                        src={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            movie.poster_path
                        }
                        alt={movie.title}
                    />
                </MoviePoster>
            </Box>
            <Dialog open={openInfo} onClick={handleCloseDialog}>
                <DialogTitle>{movie.title}</DialogTitle>
                <Card
                    sx={{
                        maxWidth: "600px",
                        overflowY: "scroll",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="300px"
                        sx={{ objectFit: "contain", maxWidth: "100%" }}
                        image={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            movie.poster_path
                        }
                        alt={movie.title}
                    />
                    <CardContent>
                        <List>
                            <ListItem>
                                <Typography>{movie.overview}</Typography>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <CalendarMonth />
                                </ListItemIcon>
                                Data de lançamento: {releaseDate}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <StarRate />
                                </ListItemIcon>
                                Nota média: {movie.vote_average}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocalMovies />
                                </ListItemIcon>
                                Onde assistir:
                                <Stack direction="column">
                                    {loading ? (
                                        <CircularProgress size={30} />
                                    ) : watchProviders != undefined ? (
                                        watchProviders.map((provider) => {
                                            return (
                                                <Box
                                                    border={"1px solid gray"}
                                                    display="flex"
                                                    justifyContent="center"
                                                >
                                                    <Typography>
                                                        {provider.provider_name}
                                                    </Typography>
                                                </Box>
                                            );
                                        })
                                    ) : (
                                        <Typography>
                                            Não há streamings disponíveis para
                                            esse filme :c
                                        </Typography>
                                    )}
                                </Stack>
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        {userToken ? (
                            isLiked != true ? (
                                <Button
                                    variant="contained"
                                    onClick={handleLikeMovie}
                                >
                                    Adicionar aos favoritos
                                </Button>
                            ) : (
                                <Button variant="contained" disabled>
                                    Filme já favoritado!
                                </Button>
                            )
                        ) : (
                            <Button variant="contained" disabled>
                                Entre para adicionar este conteúdo aos
                                favoritos!
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Dialog>
            <Snackbar
                open={openSnack}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
            >
                {snackStatus === "success" ? (
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Filme adicionado com sucesso!
                    </Alert>
                ) : (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Algo deu errado!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export const MoviePoster = styled.div`
    margin: 5px 10px;
    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
        transform: scale(1.05);
    }
`;
