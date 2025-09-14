import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, Typography} from "@mui/material";
import {api} from "../shared/apiClient";
// import { useAppDispatch, useAppSelector } from "../shared/hooks"; // if you add hooks
// import { inc } from "../features/counter/counterSlice";

type Todo = { id: number; title: string; completed: boolean };

export default function Home() {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["todos"],
        queryFn: () => api<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=5")
    });

    // const dispatch = useAppDispatch();
    // const value = useAppSelector(s => s.counter.value);

    if (isLoading) return <CircularProgress/>;
    if (isError) return <Typography color="error">Failed to load todos.</Typography>;

    return (
        <Box p={3} display="grid" gap={2}>
            <Typography variant="h5">Hello 👋</Typography>

            {/* <Box display="flex" gap={1} alignItems="center">
        <Typography>Counter: {value}</Typography>
        <Button onClick={() => dispatch(inc())}>Increment</Button>
      </Box> */}

            <Box>
                <Typography variant="subtitle1" gutterBottom>Sample todos (React Query)</Typography>
                <ul>
                    {data?.map(t => (
                        <li key={t.id}>{t.title} {t.completed ? "✅" : "⏳"}</li>
                    ))}
                </ul>
            </Box>
        </Box>
    );
}
