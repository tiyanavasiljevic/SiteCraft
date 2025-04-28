import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useDndContext } from '@dnd-kit/core';
import { useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const DraggableElement = ({
  el,
  onClick,
  isSelected,
  onResize,
  onContentChange,
  updateZIndex
}) => {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: el.id });
  const { active } = useDndContext();
  const isDragging = active?.id === el.id;

  useEffect(() => {
    if (isDragging) {
      const currentZIndex = el.style.zIndex; // CURRENT Z INDEX
      // STOP INFINITE LOOP
      if (currentZIndex !== el.style.zIndex) {
        updateZIndex(el.id);
      }
    }
  }, [isDragging, el.id, el.style.zIndex, updateZIndex]);


  //RENDER ELEMENT FUNCTION
  const renderElement = (el) => {
    switch (el.type) {
      case 'text':
        return (
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onInput={(e) => {
              onContentChange(el.id, e.currentTarget.innerText);
            }}
            style={{
              width: '100%',
              height: '100%',
              padding: '5px',
              fontSize: el.style.fontSize || '16px',
              color: el.style.color || '#000',
              outline: 'none',
              backgroundColor: isSelected ? '#fffbe6' : 'transparent',
              cursor: 'text',
              userSelect: 'text',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {el.content}
          </div>
        );


      case 'button':
        return (
          <button
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: el.style.backgroundColor || '#f0ad4e',
              color: el.style.color || '#fff',
              fontSize: el.style.fontSize || '16px',
              border: 'none',
              borderRadius: el.style.borderRadius || '4px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {el.content}
          </button>
        );


      case 'map':
        return (
          <iframe
            src={el.content}
            style={{ width: '100%', height: '100%', border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        );

      case 'image':
        return (
          <img
            src={el.content}
            alt="element"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(el.id);
        updateZIndex && updateZIndex(el.id); // ON THE TOP
      }}

      style={{
        ...el.style,
        position: 'absolute',
        border: isSelected ? '2px solid blue' : '1px solid #ccc',
        cursor: 'move',

        backgroundColor: el.style.backgroundColor || 'transparent',
        zIndex: isSelected ? 10 : el.style.zIndex,

      }}
    >

      <div
        style={{
          transform: isDragging && transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : 'none',
        }}
      >

        <ResizableBox
          width={parseInt(el.style.width)}
          height={parseInt(el.style.height)}
          minConstraints={[50, 50]}
          maxConstraints={[1000, 1000]}
          onResizeStop={(e, data) => onResize(el.id, data.size.width, data.size.height)}
        >
          {renderElement(el)}
        </ResizableBox>
      </div>
    </div>

  );
};


export default DraggableElement;
