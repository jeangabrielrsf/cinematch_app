import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    MouseEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../LoginDialog";
import SignupDialog from "../SignupDialog";
import UserTokenContext from "@/contexts/authContext";
import { searchAContent } from "@/services/moviesApi";

interface ContentTMDB {
    backdrop_path: string;
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    title: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface OptionsResult {
    page?: number;
    results: ContentTMDB[];
}

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const userContext = useContext(UserTokenContext);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [searchText, setSearchText] = useState<string>("");
    const [options, setOptions] = useState<OptionsResult>({ results: [] });
    const pages = ["filmes populares", "séries populares"];
    const navigate = useNavigate();

    function handleMenu(event: MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }

    function handleChangePage() {
        navigate("/favoritos");
        handleClose();
    }

    function handleOpenLoginDialog() {
        setOpenLoginDialog(true);
    }

    function handleOpenRegisterDialog() {
        setOpenRegisterDialog(true);
    }

    function handleLogout() {
        userContext?.setUserToken("");
        handleClose();
    }

    const debounce = (func: (query: string) => void, delay: number) => {
        let debounceTimer: NodeJS.Timeout;
        return function (query: string) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func(query), delay);
        };
    };

    const fetchSearchResults = useCallback(async (query: string) => {
        if (query.length < 2) {
            setOptions({ results: [] });
            setLoadingSearch(false);
            return;
        }

        setLoadingSearch(true);
        try {
            const data = await searchAContent(query);
            console.log(data);
            setOptions({ results: data.results });
        } catch (error) {
            console.error(error);
            setOptions({ results: [] });
        }
        setLoadingSearch(false);
    }, []);

    const debouncedFetchSearchResults = useCallback(
        debounce((query: string) => fetchSearchResults(query), 300),
        [fetchSearchResults]
    );

    useEffect(() => {
        if (searchText) {
            debouncedFetchSearchResults(searchText);
        }
    }, [searchText, debouncedFetchSearchResults]);

    return (
        <AppBar
            position="static"
            sx={{ padding: "10px", backgroundColor: "#FB8500" }}
        >
            <Toolbar
                disableGutters
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Stack direction="row" flexGrow={0}>
                    <Typography
                        variant="h3"
                        onClick={() => navigate("/")}
                        textAlign="center"
                    >
                        CineMatch
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                variant="outlined"
                                size="large"
                                key={page}
                                sx={{
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                    display: "block",
                                    color: "#fff",
                                    backgroundColor: "#023047",
                                    ":hover": {
                                        backgroundColor: "#023047",
                                        transform: "scale(1.05)",
                                    },
                                }}
                                onClick={() => {
                                    if (page === "séries populares") {
                                        navigate("/series-populares");
                                    } else {
                                        navigate("/filmes-populares");
                                    }
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Stack>

                <Autocomplete
                    sx={{ width: "300px" }}
                    options={options?.results}
                    open={openSearch}
                    loading={loadingSearch}
                    isOptionEqualToValue={(option, value) =>
                        option.title === value.title
                    }
                    getOptionLabel={(option) => option.title}
                    onInputChange={(event, value) => {
                        console.log(event);
                        setSearchText(value);
                        setOpenSearch(true);
                    }}
                    onClose={() => setOpenSearch(false)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Procure um conteúdo..."
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingSearch ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
                <div>
                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {userContext?.userToken.length === 0
                            ? [
                                  <MenuItem
                                      onClick={handleOpenLoginDialog}
                                      key="login"
                                  >
                                      Login
                                  </MenuItem>,
                                  <MenuItem
                                      onClick={handleOpenRegisterDialog}
                                      key="register"
                                  >
                                      Cadastrar
                                  </MenuItem>,
                              ]
                            : [
                                  <MenuItem
                                      onClick={handleChangePage}
                                      key="likes"
                                  >
                                      Meus Favoritos
                                  </MenuItem>,
                                  <MenuItem onClick={handleLogout} key="logout">
                                      Logout
                                  </MenuItem>,
                              ]}
                    </Menu>
                    <LoginDialog
                        openDialog={openLoginDialog}
                        setOpenDialog={setOpenLoginDialog}
                        setAuth={userContext.setUserToken}
                        setAnchorEl={setAnchorEl}
                    />
                    <SignupDialog
                        openDialog={openRegisterDialog}
                        setOpenDialog={setOpenRegisterDialog}
                        setAnchorEl={setAnchorEl}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}
