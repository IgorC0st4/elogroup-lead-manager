import {
  TableCell,
} from '@mui/material';
import {
  styled,
} from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

// Custom "dumb" base component to be rendered on LeadsTable
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  border: '1px solid black',
  textAlign: 'center',
}));

export default StyledTableCell;
