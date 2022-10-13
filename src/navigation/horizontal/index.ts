// ** Icon imports
import Apps from 'mdi-material-ui/Apps'
import Menu from 'mdi-material-ui/Menu'
import Table from 'mdi-material-ui/Table'
import Lifebuoy from 'mdi-material-ui/Lifebuoy'
import ChartLine from 'mdi-material-ui/ChartLine'
import CogOutline from 'mdi-material-ui/CogOutline'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import FormSelect from 'mdi-material-ui/FormSelect'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import CartOutline from 'mdi-material-ui/CartOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import FileOutline from 'mdi-material-ui/FileOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import ChartBellCurve from 'mdi-material-ui/ChartBellCurve'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import BookOpenOutline from 'mdi-material-ui/BookOpenOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'
import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import PaletteSwatchOutline from 'mdi-material-ui/PaletteSwatchOutline'
import CheckboxMarkedOutline from 'mdi-material-ui/CheckboxMarkedOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ChartBellCurveCumulative from 'mdi-material-ui/ChartBellCurveCumulative'
import CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'
import MonitorDashboard from 'mdi-material-ui/MonitorDashboard'
import CarElectricOutline from 'mdi-material-ui/CarElectricOutline'
import EvStation from 'mdi-material-ui/EvStation'
import CarWrench from 'mdi-material-ui/CarWrench'
import Plus from 'mdi-material-ui/Plus'
// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Admin',
      icon: CarElectricOutline,
      children: [
        {
          title: 'vehicles database',
          icon: CarElectricOutline,
          path: '/apps/admin/list'
        },
        {
          title: 'add new vehicle',
          icon: Plus,
          path: '/apps/admin/add'
        },
        {
          title: 'Chargers',
          icon: EvStation,
          path: '/apps/admin/chargers'
        },
        {
          title: 'Maintainers',
          icon: CarWrench,
          path: '/apps/admin/maintainers'
        }
      ]
    },
    {
      title: 'Charger App',
      icon: EvStation,
      path: '/apps/charger/main'
    },
    {
      title: 'Maintainer App',
      icon: CarWrench,
      path: '/apps/maintainer/main'
    }
  ]
}

export default navigation
