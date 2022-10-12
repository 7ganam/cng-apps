// ** React Imports
import { Fragment, useState, useEffect, MouseEvent, ReactElement, forwardRef, useMemo, ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
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

// ** Icons Imports
import Send from 'mdi-material-ui/Send'
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

import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import vehicle, { fetchData } from 'src/store/apps/vehicle'

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

// ** Utils
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
const StyledTypography = styled(Typography)(({ theme }) => ({
  overflowY: 'auto',
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.background.paper,
  ...(themeConfig.menuTextTruncate ? { width: 260 } : { minWidth: 260 }),

  '&::-webkit-scrollbar': {
    height: 6
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 20,
    background: hexToRGBA(theme.palette.mode === 'light' ? '#BFBFD5' : '#57596C', 0.6)
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: 20,
    background: 'transparent'
  }
}))

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: VehicleType
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem>
          <Download fontSize='small' sx={{ mr: 2 }} />
          Download
        </MenuItem>
        <Link href={`/apps/invoice/edit/${id}`} passHref>
          <MenuItem>
            <PencilOutline fontSize='small' sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>
        <MenuItem>
          <ContentCopy fontSize='small' sx={{ mr: 2 }} />
          Duplicate
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

// ** renders plate column
const renderPlate = (row: VehicleType) => {
  return (
    <>
      <CustomAvatar skin='light' color={'primary'} sx={{ width: 34, height: 34, mr: '10px' }}>
        {<CarElectricOutline />}
      </CustomAvatar>
      <Typography variant='body2' sx={{ letterSpacing: '-1px' }}>
        {row.plate}
      </Typography>
    </>
  )
}

const defaultColumns = [
  {
    flex: 0.15,
    minWidth: 125,
    field: 'plate',
    headerName: 'plate',
    renderCell: ({ row }: CellType) => {
      return renderPlate(row)
    }
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'lastMaintenanceDate',
    headerName: 'Last Maintenance Date',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>
        {format(new Date(row.maintenances[row.maintenances.length - 1]), 'dd/MM/yyyy') ?? '-'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'maintenancePeriod',
    headerName: 'Maintenance Period',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.maintenance_period}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'RemainingDays',
    headerName: 'Remaining Days',
    renderCell: ({ row }: CellType) => renderRemainingDays(row)
  },
  {
    flex: 0.15,
    minWidth: 50,
    field: 'qrString',
    headerName: 'QR',
    renderCell: ({ row }: CellType) => <StyledTypography variant='body2'>{row.qr_str ?? '-'}</StyledTypography>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'chargerNotes',
    headerName: 'Charger Notes',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.charger_note ?? '-'}</Typography>
  }
]

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

// ** Utils
const renderRemainingDays = (row: VehicleType): ReactNode => {
  let str = row.maintenances[row.maintenances.length - 1]
  let diffDays = differenceInDays(new Date(), new Date(str))
  let results =
    diffDays < row.maintenance_period ? (
      <Typography variant='body2'>{diffDays.toString()}</Typography>
    ) : (
      <CustomChip size='small' skin='light' color='error' label='needs maintenance' />
    )

  return results
}

const VehicleList = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [statusValue, setStatusValue] = useState<string>('')
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [startDateRange, setStartDateRange] = useState<DateType>(new Date())

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.vehicle)
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch, statusValue, value, dates])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleStatusValue = (e: SelectChangeEvent) => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete Vehicle'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => {}}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <Box>
              <Link href={`/apps/invoice/preview/${row._id}`} passHref>
                <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                  <EyeOutline />
                </IconButton>
              </Link>
            </Box>
          </Tooltip>
          <RowOptions id={row._id} />
        </Box>
      )
    }
  ]

  let rows = useMemo(
    () =>
      store.data.map((vehicle: VehicleType) => {
        return {
          ...vehicle,
          plate: `${vehicle.plate_no.split('').join(' ')} - ${vehicle.plate_str.split('').join(' ')}`
        }
      }),
    [store.data]
  )

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <Typography variant='h5' sx={{ color: 'primary.main' }}>
              Vehicles Database
            </Typography>
          </Typography>
        }
        subtitle={<Typography variant='body2'>You can inspect and add vehicles in the table below</Typography>}
      />
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='invoice-status-select'>Vehicle Status</InputLabel>

                  <Select
                    fullWidth
                    value={statusValue}
                    sx={{ mr: 4, mb: 2 }}
                    label='Vehicle Status'
                    onChange={handleStatusValue}
                    labelId='invoice-status-select'
                  >
                    <MenuItem value=''>none</MenuItem>
                    <MenuItem value='downloaded'>Downloaded</MenuItem>
                    <MenuItem value='draft'>Draft</MenuItem>
                    <MenuItem value='paid'>Paid</MenuItem>
                    <MenuItem value='past due'>Past Due</MenuItem>
                    <MenuItem value='partial payment'>Partial Payment</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Vehicle Date'
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </DatePickerWrapper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            getRowId={row => row._id}
            pagination
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            pageSize={Number(pageSize)}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onSelectionModelChange={rows => setSelectedRows(rows)}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default VehicleList
