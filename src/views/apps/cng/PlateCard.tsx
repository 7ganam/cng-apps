// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, ChangeEvent } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'

import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import { display } from '@mui/system'

interface Props {
  plate_str: string
  plate_no: string
}

const PlateCard = (props: Props) => {
  // ** Props
  const { plate_str, plate_no } = props

  // ** Hook
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          width: '200px',
          height: '130px',
          border: '1px solid gray',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px'
        }}
      >
        <Box
          sx={{
            height: '40%',
            width: '100%',
            display: 'flex',
            borderBottom: 'solid 1px gray',
            bgcolor: '#83cee5',
            color: 'white'
          }}
        >
          <Box
            sx={{
              width: '50%',
              height: '100%',
              textAlign: 'center',
              p: '4px',
              borderRight: 'solid 1px gray'
            }}
          >
            <Typography sx={{ fontSize: '25px', fontWeight: '600', color: 'white' }}>Egypt</Typography>
          </Box>
          <Box sx={{ width: '50%', height: '100%', textAlign: 'center', p: '0px' }}>
            <Typography variant='h4' sx={{ mt: '-2px', color: 'white' }}>
              مصر
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: '60%', width: '100%', display: 'flex' }}>
          {' '}
          <Box
            sx={{
              width: '50%',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography sx={{ fontSize: '25px', fontWeight: '500' }}>
              {props.plate_no.toString().split('').join(' ')}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '50%',
              height: '100%',
              textAlign: 'center',
              p: '0px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography sx={{ fontSize: '30px', fontWeight: '500', mt: '-15px', letterSpacing: '-1px' }}>
              {props.plate_str.split('').join(' ')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PlateCard
