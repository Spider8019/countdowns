import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  format: 'seconds',
  accessToken: null,
  userPhoneNumber: '',
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
      return {
        ...state,
        accessToken: payload.accessToken,
        userPhoneNumber: payload.userPhoneNumber,
      }
    },
    removeAccessToken: (state) => {
      return {
        ...state,
        accessToken: null,
        userPhoneNumber: '',
      }
    },
  },
})

export default globalSlices.reducer
export const {
  setFormat,
  setAccessToken,
  removeAccessToken,
} = globalSlices.actions
