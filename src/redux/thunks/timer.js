import { createAsyncThunk } from '@reduxjs/toolkit'
import { allTask, allTaskByYou } from '../../api'

const getTimers = createAsyncThunk('timer/getTimers', async () => {
  const response = await allTask({})
  console.log(response)
  return response
})
const getYourPersonalTimers = createAsyncThunk(
  'timer/getTimers',
  async ({ phoneNumber }) => {
    const response = await allTaskByYou({ phoneNumber })
    console.log(response)
    return response
  },
)

export const TimerThunks = {
  getTimers,
  getYourPersonalTimers,
}
