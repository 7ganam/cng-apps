// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

interface DataParams {
  q: string
  dates?: Date[]
  status: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Vehicles
export const fetchData = createAsyncThunk('appVehicle/fetchData', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cars`)
  console.log('response', response)
  return response.data
})

export const appVehicleSlice = createSlice({
  name: 'appVehicle',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
    })
  }
})

export default appVehicleSlice.reducer
