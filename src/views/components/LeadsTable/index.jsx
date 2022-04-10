/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';
import {
  styled,
} from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragTile from '../DragTile';
import EmptySlot from '../EmptySlot';
import StyledTableCell from '../StyledTableCell';
import { TilesPositionsOrder } from '../../../utils/Constants';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const renderCell = (lead, x, y, tilePosition, updateTable) => {
  if (lead.status === tilePosition) {
    return (
      <DragTile
        key={y}
        lead={lead}
        x={x}
        y={y}
      />
    );
  }
  return (<EmptySlot key={y} x={x} y={y} updateTable={updateTable} />);
};

const renderRow = (lead, i, updateTable) => (
  <StyledTableRow key={i}>
    {
        TilesPositionsOrder
          .map((tilePosition, index) => renderCell(lead, i, index, tilePosition, updateTable))
    }
  </StyledTableRow>
);

function LeadsTable({ leads, updateTable }) {
  const rows = [];
  leads.forEach((lead, index) => {
    rows.push(renderRow(lead, index, updateTable));
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Cliente em Potencial</StyledTableCell>
              <StyledTableCell>Dados Confirmados</StyledTableCell>
              <StyledTableCell>Reunião Agendada</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
}

export default LeadsTable;
