import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    format: "seconds"
}

const globalSlices = createSlice({
    name: 'globalSlices',
    initialState,
    reducers: {
        setFormat: (state, action) => {
            const { payload } = action;
            return { ...state, format:payload.format};
        },

    },
})

export default globalSlices.reducer;
export const { setFormat } = globalSlices.actions;