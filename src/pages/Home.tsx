import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import {
    AppBar, Toolbar, Container, Box,
    Typography, CircularProgress, Alert, Button
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../app/store.ts";
import { setByAmount } from '../features/counter/counterSlice.ts'
import {useEffect} from "react";

type Todo = { id: number; title: string; completed: boolean };

export default function Home() {

    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["todos"],
        queryFn: () => api<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=5"),
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    useEffect(() => {
        if (data) {
            dispatch(setByAmount(data.length));
        }
    }, [data, dispatch]);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flex: 1 }}>FE Starter</Typography>
                    <Button onClick={() => refetch()} disabled={isFetching}>Refresh</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm">
                <Box mt={3} display="grid" gap={2}>
                    <Typography variant="h5">Hello 👋</Typography>

                    {isLoading && <Box display="flex" alignItems="center" gap={1}>
                        <CircularProgress size={20} /> Loading…
                    </Box>}

                    {isError && <Alert severity="error">{(error as Error)?.message ?? "Failed to load"}</Alert>}

                    <Typography variant="h5">Counter: {count}</Typography>

                    {!isLoading && !isError && (
                        <ul>
                            {data!.map(t => (
                                <li key={t.id}>
                                    {t.title} {t.completed ? "✅" : "⏳"}
                                </li>
                            ))}
                        </ul>
                    )}
                </Box>
            </Container>
        </>
    );
}
