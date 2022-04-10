import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, TilesPositionsOrder } from '../../../utils/Constants';
import StyledTableCell from '../StyledTableCell';
import LeadController from '../../../controllers/LeadController';

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
    >
      {isOver && (
        <div
          style={{
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'grey',
          }}
        />
      )}
    </StyledTableCell>
  );
}
export default EmptySlot;
