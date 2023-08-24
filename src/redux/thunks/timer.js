import { createAsyncThunk } from '@reduxjs/toolkit'
import { allTask, allTaskByYou } from '../../api'

const getTimers = createAsyncThunk('timer/getTimers', async () => {
  const response = await allTask({})
  console.log(response)
  return response
})
const getYourPersonalTimers = createAsyncThunk(
  'timer/getTimersByYou',
  async ({ userId }) => {
    const response = await allTaskByYou({ userId })
    console.log(userId)
    return response
  },
)

export const TimerThunks = {
  getTimers,
  getYourPersonalTimers,
}
