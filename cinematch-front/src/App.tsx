import { useMemo, useState } from "react";
import "@/reset.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import UserTokenContext from "./contexts/authContext";
import MoviesContext from "./contexts/movieContext";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/palette";

function App() {
    const [userToken, setUserToken] = useState("");
    const [popularMovies, setPopularMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const userTokenContextValue = useMemo(
        () => ({ userToken, setUserToken }),
        [userToken, setUserToken]
    );
    const moviesContextValue = useMemo(
        () => ({
            popularMovies,
            setPopularMovies,
            allMovies,
            setAllMovies,
        }),
        [popularMovies, setPopularMovies, allMovies, setAllMovies]
    );

    return (
        <ThemeProvider theme={theme}>
            <UserTokenContext.Provider value={userTokenContextValue}>
                <MoviesContext.Provider value={moviesContextValue}>
                    <RouterProvider router={router} />
                </MoviesContext.Provider>
            </UserTokenContext.Provider>
        </ThemeProvider>
    );
}

export default App;
