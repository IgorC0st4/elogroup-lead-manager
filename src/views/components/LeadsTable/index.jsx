import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragTile from '../DragTile';
import EmptySlot from '../EmptySlot';
import StyledTableCell from '../StyledTableCell';
import StyledTableRow from '../StyledTableRow';
import { TilesPositionsOrder } from '../../../utils/Constants';

// Verify if current cell to be rendered must be a DragTile or an EmptySlot
// lead -> current lead object
// x -> table row
// y -> table column
// tilePosition -> column category
// updateTable -> function to trigger table re-render
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

// Loops through status categories and renders a row
// lead -> current lead object
// row -> row number
// updateTable -> function to trigger table re-render
const renderRow = (lead, row, updateTable) => (
  <StyledTableRow key={row}>
    {
        TilesPositionsOrder
          .map((tilePosition, column) => renderCell(lead, row, column, tilePosition, updateTable))
    }
  </StyledTableRow>
);

// Component that will render the table with
// All registered leads on their correspondent status columns
// leads -> array with registered leads
// updateTable -> function to trigger table re-render
function LeadsTable({ leads, updateTable }) {
  const rows = [];
  leads.forEach((lead, index) => {
    rows.push(renderRow(lead, index, updateTable));
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper}>
        <Table>
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
