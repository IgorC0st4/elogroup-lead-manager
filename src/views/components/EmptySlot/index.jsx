import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, TilesPositionsOrder } from '../../../utils/Constants';
import StyledTableCell from '../StyledTableCell';
import LeadController from '../../../controllers/LeadController';

// "Smart" component where DragTile can be dropped on
// Main props are:
// x -> row on table
// y -> column on table
// updateTable -> function to trigger table re-render
function EmptySlot({ x, y, updateTable }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.LEAD,
      drop: (lead) => {
        if (lead.x === x && y === lead.y + 1) {
          const newStatus = TilesPositionsOrder[TilesPositionsOrder.indexOf(lead.status) + 1];
          LeadController.updateLead(Object.assign(lead, { status: newStatus }));
          updateTable();
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y],
  );
  return (
    <StyledTableCell
      ref={drop}
      style={isOver ? {
        opacity: 0.5,
        backgroundColor: 'greenyellow',
      } : {}}
    />
  );
}
export default EmptySlot;
