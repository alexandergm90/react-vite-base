import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: { inc: s => { s.value += 1; } }
});
export const { inc } = slice.actions;
export default slice.reducer;
