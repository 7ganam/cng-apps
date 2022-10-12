// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components
import axios from 'axios'

// ** Types
import { VehicleType } from 'src/types/apps/vehicleTypes'

// ** Demo Components Imports
import AddCard from 'src/views/apps/vehicle/add/AddCard'
import AddActions from 'src/views/apps/vehicle/add/AddActions'
import AddNewCustomers from 'src/views/apps/vehicle/add/AddNewCustomer'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const InvoiceAdd = () => {
  // ** State
  const [addCustomerOpen, setAddCustomerOpen] = useState<boolean>(false)

  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard invoiceNumber={111} toggleAddCustomerDrawer={toggleAddCustomerDrawer} />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions />
        </Grid>
      </Grid>
    </>
  )
}

export default InvoiceAdd
