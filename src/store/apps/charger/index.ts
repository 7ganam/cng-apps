// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { VehicleType } from 'src/types/apps/vehicleTypes'
import { hi } from 'date-fns/locale'

interface State {
  showQrModal: boolean
  view: 'view1' | 'view2' | 'view3'
  scannedVehicle: null | VehicleType
  vehicleFetchError?: string | null
}

let initialState: State = {
  showQrModal: false,
  view: 'view1',
  scannedVehicle: null
}

// ** Fetch Vehicle By QR Code
export const fetchData = createAsyncThunk('appCharger/fetchData', async (qr: string, { dispatch }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cars/getcar/${qr}`)
  dispatch(hideQrModal())
  let result = response.data.data[0]
  console.log('result', result)
  return result
})

export const appChargerSlice = createSlice({
  name: 'appCharger',
  initialState,
  reducers: {
    showQrModal: state => {
      state.showQrModal = true
    },
    hideQrModal: state => {
      state.showQrModal = false
    },
    wrongVehiclePlate: state => {
      state.showQrModal = false
      state.view = 'view1'
      state.scannedVehicle = null
    },
    rightVehiclePlate: state => {
      state.view = 'view3'
    },
    reset: state => {
      state.showQrModal = false
      state.view = 'view1'
      state.scannedVehicle = null
      state.vehicleFetchError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.scannedVehicle = action?.payload
        state.vehicleFetchError = null
        state.view = 'view2'
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.vehicleFetchError = `something went wrong. Couldn't fetch vehicle`
        state.view = 'view1'
      })
  }
})

export const { showQrModal, hideQrModal, wrongVehiclePlate, rightVehiclePlate, reset } = appChargerSlice.actions

export default appChargerSlice.reducer
