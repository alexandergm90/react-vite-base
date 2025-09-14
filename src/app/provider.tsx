import type {PropsWithChildren} from "react";
import {ThemeProvider, CssBaseline} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import theme from "./theme";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./store";

const qc = new QueryClient();

export default function AppProviders({children}: PropsWithChildren) {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={qc}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </ReduxProvider>
    );
}
