import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  format: 'seconds',
  accessToken: null,
  userPhoneNumber: '',
  userId: '',
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
        userId: payload.userId,
      }
    },
    removeAccessToken: (state) => {
      return {
        ...state,
        accessToken: null,
        userPhoneNumber: '',
        userId:''
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
