import { createSlice } from "@reduxjs/toolkit";
import { TimerThunks } from "../thunks/timer";

const initialState = {
    isLoading: true,
    isError: false,
    timers: []
}

const timerSlice = createSlice({
    name: 'timerSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [TimerThunks.getTimers.pending]: (state) => {
            state.isLoading = true;
        },
        [TimerThunks.getTimers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.timers = action.payload;
        },
        [TimerThunks.getTimers.rejected]: (state, action) => {
            state.isError = "Fetch Failed";
            state.isLoading = false;
        }
    }
}
)


export default timerSlice.reducer;
