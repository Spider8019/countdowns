import { createAsyncThunk } from '@reduxjs/toolkit'
import { allTask, allTaskByYou } from '../../api'

const getTimers = createAsyncThunk('timer/getTimers', async () => {
  const response = await allTask({})
  console.log(response)
  return response
})
const getYourPersonalTimers = createAsyncThunk(
  'timer/getTimers',
  async ({ userId }) => {
    const response = await allTaskByYou({ userId })
    console.log(response)
    return response
  },
)

export const TimerThunks = {
  getTimers,
  getYourPersonalTimers,
}
