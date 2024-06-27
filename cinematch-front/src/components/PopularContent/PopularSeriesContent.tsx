import { getPopularSeries } from "@/services/seriesApi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SerieContent from "../SerieContent/SerieContent";
import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Pagination,
    Stack,
} from "@mui/material";
import { SerieData } from "@/utils/contentUtils";

export default function PopularSeriesContent() {
    const [popularSeries, setPopularSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchSeriesData = useCallback(async () => {
        setLoading(true);
        const data = await getPopularSeries(page);
        setPopularSeries(data.results);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchSeriesData().catch(console.error);
    }, [fetchSeriesData]);

    function handlePage(event: ChangeEvent<unknown>, value: number) {
        console.log(event);
        setPage(value);
    }

    return (
        <Container>
            {loading ? (
                <Box display={"flex"} justifyContent={"center"}>
                    <CircularProgress size={100} />
                </Box>
            ) : (
                <Grid container columns={4}>
                    <SeriesContainer>
                        {popularSeries.map((serie: SerieData, index) => {
                            return <SerieContent key={index} serie={serie} />;
                        })}
                    </SeriesContainer>
                </Grid>
            )}
            <Stack spacing={2}>
                <Pagination
                    onChange={handlePage}
                    variant="outlined"
                    count={20}
                    size="large"
                    color="custom"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                />
            </Stack>
        </Container>
    );
}

const SeriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
