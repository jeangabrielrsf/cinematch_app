import UserTokenContext from "@/contexts/authContext";
import { getUserLikedSeries, likeASerie } from "@/services/cinematch";
import { getSerieWatchProvider } from "@/services/seriesApi";
import { SerieData } from "@/utils/contentUtils";
import { SerieContentProps, WatchProviders } from "@/utils/types";
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

export default function SerieContent({ serie, tmdb_id }: SerieContentProps) {
    const [openInfo, setOpenInfo] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackStatus, setSnackStatus] = useState<string>("");
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [watchProviders, setWatchProviders] = useState<
        WatchProviders[] | undefined
    >([]);
    const userToken = useContext(UserTokenContext).userToken;
    const releaseDate = dayjs(serie.first_air_date).format("DD/MM/YYYY");

    function handleOpenDialog() {
        handleSerieProviders();
        isSerieFavorited();
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

    async function isSerieFavorited() {
        const data = await getUserLikedSeries(userToken);
        const likedSeries = data.liked_series;
        for (const likedSerie of likedSeries) {
            if (likedSerie.name == serie.name) setIsLiked(true);
        }
    }

    async function handleLikeSerie() {
        if (!userToken) {
            // usuário não logado!
            return;
        }
        const serieData: SerieData = {
            name: serie.name,
            overview: serie.overview,
            tmdb_id: serie.id,
            popularity: serie.popularity,
            vote_average: serie.vote_average,
            vote_count: serie.vote_count,
            poster_path: serie.poster_path,
            first_air_date: serie.first_air_date,
        };
        try {
            await likeASerie(userToken, serieData);
            handleSnackBarOpen("success");
        } catch (error) {
            console.error(error);
            handleSnackBarOpen("error");
        }
    }

    async function handleSerieProviders() {
        setLoading(true);
        let data;
        try {
            if (tmdb_id) {
                data = await getSerieWatchProvider(tmdb_id);
            } else {
                data = await getSerieWatchProvider(serie.id);
            }
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
                <SeriePoster>
                    <img
                        src={
                            import.meta.env.VITE_BASE_POSTER_URL +
                            serie.poster_path
                        }
                        alt={serie.name}
                    />
                </SeriePoster>
            </Box>
            <Dialog open={openInfo} onClick={handleCloseDialog}>
                <DialogTitle>{serie.name}</DialogTitle>
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
                            serie.poster_path
                        }
                        alt={serie.name}
                    />
                    <CardContent>
                        <List>
                            <ListItem>
                                <Typography>{serie.overview}</Typography>
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
                                Nota média: {serie.vote_average}
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
                                            esse seriado :c
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
                                    onClick={handleLikeSerie}
                                >
                                    Adicionar aos favoritos
                                </Button>
                            ) : (
                                <Button variant="contained" disabled>
                                    Seriado já favoritado!
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
                        Série adicionada com sucesso!
                    </Alert>
                ) : (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Não foi possível incluir!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

const SeriePoster = styled.div`
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
