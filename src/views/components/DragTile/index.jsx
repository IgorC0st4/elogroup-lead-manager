import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../utils/Constants';
import StyledTableCell from '../StyledTableCell';

// "Smart" component that can be dragged
// Main props are:
// lead -> object that will populate the text
// x -> row on table
// y -> column on table
function DragTile({ lead, x, y }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LEAD,
    item: () => Object.assign(lead, { x }, { y }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <StyledTableCell
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      {lead.name}
    </StyledTableCell>
  );
}

export default DragTile;
