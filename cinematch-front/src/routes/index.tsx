import Header from "@/components/Header/Header";
import HomePage from "@/pages/HomePage";
import PopularMovies from "@/pages/PopularMovies";
import PopularSeries from "@/pages/PopularSeries";
import Recommendations from "@/pages/Recommendations";
import UserFavorites from "@/pages/UserFavorites";
import { createBrowserRouter, Outlet } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header />
                <Outlet />
            </>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "filmes-populares",
                element: <PopularMovies />,
            },
            {
                path: "series-populares",
                element: <PopularSeries />,
            },
            {
                path: "recomendacoes",
                element: <Recommendations />,
            },
            {
                path: "favoritos",
                element: <UserFavorites />,
            },
        ],
    },
]);

export default router;
