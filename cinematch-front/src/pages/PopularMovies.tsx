import PopularMovieContent from "@/components/PopularContent/PopularMovieContent";
import { Box, Typography } from "@mui/material";

export default function PopularMovies() {
    return (
        <Box sx={{ padding: "10px" }}>
            <Typography
                variant="h2"
                color="#fff"
                justifyContent="center"
                display="flex"
            >
                Filmes Populares
            </Typography>
            <PopularMovieContent />
        </Box>
    );
}
