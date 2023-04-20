import { createAsyncThunk } from "@reduxjs/toolkit"
import { allTask } from "../../api";

const getTimers = createAsyncThunk(
    'timer/getTimers',
    async () => {
        const response = await allTask();
        console.log(response)
        return response;
    }
)

export const TimerThunks = {
    getTimers
};