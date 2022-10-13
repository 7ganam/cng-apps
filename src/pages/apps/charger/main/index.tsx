// ** React Imports
import { Fragment, useState, useEffect, MouseEvent, ReactElement, forwardRef, useMemo, ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import QrDialog from 'src/views/components/dialogs/QrDialog'
import PlateCard from 'src/views/apps/cng/PlateCard'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

// ** Icons Imports
import CheckBold from 'mdi-material-ui/CheckBold'
import ClockTimeSixOutline from 'mdi-material-ui/ClockTimeSixOutline'
import Check from 'mdi-material-ui/Check'
import ChartPie from 'mdi-material-ui/ChartPie'
import Download from 'mdi-material-ui/Download'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import ContentSaveOutline from 'mdi-material-ui/ContentSaveOutline'
import CarElectricOutline from 'mdi-material-ui/CarElectricOutline'
import Paper from '@mui/material/Paper'

// ** Third Party Imports
import format from 'date-fns/format'
import { formatDistance } from 'date-fns'
import { intervalToDuration } from 'date-fns'
import { differenceInDays } from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'

import DatePicker from 'react-datepicker'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { VehicleType } from 'src/types/apps/vehicleTypes'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

// Styled Grid component
const StyledGrid1 = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 4.75),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}))

// Styled Grid component
const StyledGrid2 = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0 !important'
  },
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '11rem',
  borderRadius: theme.shape.borderRadius
}))
// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { wrongVehiclePlate, rightVehiclePlate, reset } from 'src/store/apps/charger'

const ChargerMain = () => {
  const DispenserIp = '192.168.0.12'

  // ** State
  const [dispenserNumber, setDispenserNumber] = useState('4')

  const [note, setNote] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.charger)
  // const dispatch = useDispatch<AppDispatch>()
  // const store = useSelector((state: RootState) => state.charger)
  // useEffect(() => {
  //   dispatch(fetchData())
  // }, [dispatch, statusValue, value, dates])

  const handleWrongPlate = () => {
    dispatch(wrongVehiclePlate())
  }

  const handleRightPlate = () => {
    dispatch(rightVehiclePlate())
  }

  const openDispenser = async (dispenserNo: string | number) => {
    try {
      const res = axios.get(`https://${DispenserIp}/Charger${dispenserNo}_ON`)
      console.log('res', res)
    } catch (error) {
      console.log('sent open request')
    }
  }

  const addNote = async (note: string) => {
    try {
      setLoading(true)
      const res = axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cars/${store?.scannedVehicle?._id}`, {
        charger_note: note
      })
      setLoading(false)
      toast.success('Note Added')
      console.log('res', res)
    } catch (error) {
      console.log('sent open request')
    }
  }

  let view1 = () => (
    <Grid item xs={12}>
      <Card sx={{ maxWidth: '600px', margin: 'auto' }}>
        <Grid container spacing={6}>
          <StyledGrid item md={5} xs={12}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img width={137} height={'auto'} alt='Apple iPhone 11 Pro' src='/images/cng/charger/qr-code.jpg' />
            </CardContent>
          </StyledGrid>
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              pt: theme => ['0 !important', '0 !important', `${theme.spacing(6)} !important`],
              pl: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(6)} !important`, '0 !important']
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Is this the right plate number?
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Click yes if this is the number of the vehicle you are charging.
              </Typography>
            </CardContent>
            <CardActions className='card-action-dense'>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <QrDialog></QrDialog>
              </Box>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )

  let view2 = () => (
    <Grid item xs={12}>
      <Card sx={{ maxWidth: '600px', margin: 'auto' }}>
        <Grid container spacing={6}>
          <StyledGrid item md={5} xs={12}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlateCard
                plate_no={store?.scannedVehicle?.plate_no ?? '-'}
                plate_str={store?.scannedVehicle?.plate_str ?? '-'}
              ></PlateCard>
            </CardContent>
          </StyledGrid>
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              pt: theme => ['0 !important', '0 !important', `${theme.spacing(6)} !important`],
              pl: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(6)} !important`, '0 !important']
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Is this the right plate number?
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Click yes if this is the number of the vehicle you are charging.
              </Typography>
            </CardContent>
            <CardActions className='card-action-dense'>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button variant='outlined' onClick={handleWrongPlate} fullWidth sx={{ m: 1 }}>
                  <ClockTimeSixOutline fontSize='small' sx={{ mr: 2 }} />
                  No
                </Button>
                <Button variant='contained' onClick={handleRightPlate} fullWidth sx={{ m: 1 }}>
                  <CheckBold fontSize='small' sx={{ mr: 2 }} />
                  Yes
                </Button>
              </Box>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
  let view3 = () => (
    <>
      <Grid item xs={12}>
        <Card sx={{ margin: 'auto', maxWidth: '700px' }}>
          <Grid container spacing={2}>
            <StyledGrid2 item xs={12} md={4}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Img alt='Stumptown Roasters' src='/images/cng/charger/valve.png' />
              </CardContent>
            </StyledGrid2>
            <StyledGrid1 item xs={12} md={7} sx={{}}>
              <CardContent sx={{ p: theme => `${theme.spacing(6)} !important` }}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Open Supply Dispenser
                </Typography>
                <Box sx={{ py: 1, mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='body2'>Choose dispenser number then click "Open"</Typography>
                </Box>
                <Typography
                  variant='subtitle2'
                  className='col-title'
                  sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                >
                  Dispenser Number:
                </Typography>
                <Select
                  size='small'
                  defaultValue='4'
                  value={dispenserNumber}
                  onChange={e => {
                    setDispenserNumber(e.target.value)
                  }}
                >
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                </Select>

                <Button
                  variant='contained'
                  sx={{ ml: '10px', mt: '-2px' }}
                  onClick={() => {
                    openDispenser(dispenserNumber)
                  }}
                >
                  Open
                </Button>
              </CardContent>
            </StyledGrid1>
          </Grid>
        </Card>
        <Card sx={{ margin: 'auto', maxWidth: '700px', mt: '20px' }}>
          <Grid container spacing={2}>
            <StyledGrid2 item xs={12} md={4}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Img alt='Stumptown Roasters' src='/images/cng/charger/note.png' />
              </CardContent>
            </StyledGrid2>
            <StyledGrid1 item xs={12} md={7} sx={{}}>
              <CardContent sx={{ p: theme => `${theme.spacing(6)} !important` }}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Add Note to the Vehicle
                </Typography>
                <Box sx={{ py: 1, mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='body2'>
                    Type your note and click submit to be attached to this vehicle"
                  </Typography>
                </Box>

                <TextField
                  rows={2}
                  fullWidth
                  multiline
                  size='small'
                  sx={{ mt: 3.5 }}
                  value={note}
                  onChange={e => {
                    setNote(e.target.value)
                  }}
                />
                <Button
                  variant='contained'
                  sx={{ mt: '20px' }}
                  onClick={() => {
                    addNote(note)
                  }}
                >
                  Add Note
                </Button>
              </CardContent>
            </StyledGrid1>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ margin: 'auto', maxWidth: '700px', display: 'flex', justifyContent: 'end' }}>
          <Button
            variant='contained'
            sx={{ mt: '20px' }}
            onClick={() => {
              dispatch(reset())
            }}
          >
            Go Back
          </Button>
        </Box>
      </Grid>
    </>
  )

  return (
    <>
      <Grid container spacing={6}>
        <PageHeader
          title={
            <Typography variant='h5'>
              <Typography variant='h5' sx={{ color: 'primary.main' }}>
                Charger
              </Typography>
            </Typography>
          }
          subtitle={<Typography variant='body2'>CNG Charger App</Typography>}
        />
        {store.view === 'view1' && view1()}
        {store.view === 'view2' && view2()}
        {store.view === 'view3' && view3()}
      </Grid>
    </>
  )
}

export default ChargerMain
