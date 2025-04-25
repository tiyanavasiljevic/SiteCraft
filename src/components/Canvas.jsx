import React from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import 'react-resizable/css/styles.css';
import DraggableElement from './DraggableElement';  // Custom draggable element komponenta

// SNAP TO GRID HELPER
const snapToGrid = (x, y, gridSize = 20) => {
  const snappedX = Math.round(x / gridSize) * gridSize;
  const snappedY = Math.round(y / gridSize) * gridSize;
  return [snappedX, snappedY];
};

const Canvas = ({
  elements,
  onElementClick,
  selectedElementId,
  updateElementPosition,
  updateElementSize,
  onContentChange,
  updateZIndex,
}) => {
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  //HANDLE DRAG END FUNCTION
  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const draggedElement = elements.find((el) => el.id === active.id);

    //
    if (draggedElement) {

      if (draggedElement) {
        const currentLeft = parseInt(draggedElement.style.left, 10) || 0;
        const currentTop = parseInt(draggedElement.style.top, 10) || 0;
        const newLeft = currentLeft + delta.x;
        const newTop = currentTop + delta.y;

        const [snappedX, snappedY] = snapToGrid(newLeft, newTop);

        //UPDATE POSITION
        updateElementPosition(active.id, snappedX, snappedY);


        updateZIndex(active.id);


      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        ref={setNodeRef}
        className="canvas"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onElementClick(null); //DESELECT
          }
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          border: '1px solid #ccc',
          overflow: 'hidden',
          backgroundImage: `
            linear-gradient(to right, #eee 1px, transparent 1px),
            linear-gradient(to bottom, #eee 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      >
        {elements.map((el) => (
          <DraggableElement
            key={el.id}
            el={el}
            onClick={onElementClick}
            isSelected={el.id === selectedElementId}
            onResize={updateElementSize}
            onContentChange={onContentChange}
            updateZIndex={updateZIndex}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default Canvas;
