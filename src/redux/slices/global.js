import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  format: 'seconds',
  accessToken: null,
}

const globalSlices = createSlice({
  name: 'globalSlices',
  initialState,
  reducers: {
    setFormat: (state, action) => {
      const { payload } = action
      return { ...state, format: payload.format }
    },
    setAccessToken: (state, action) => {
      const { payload } = action
      return { ...state, accessToken: payload.accessToken }
    },
  },
})

export default globalSlices.reducer
export const { setFormat, setAccessToken } = globalSlices.actions
