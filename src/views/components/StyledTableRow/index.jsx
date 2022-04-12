import {
  TableRow,
} from '@mui/material';
import {
  styled,
} from '@mui/material/styles';

// Custom "dumb" component to be rendered on LeadsTable
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default StyledTableRow;
