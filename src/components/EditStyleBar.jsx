import React from 'react';
import { Form, Button } from 'react-bootstrap';

const EditStyleBar = ({
  selectedElement, onStyleChange,
  onDelete,
  onContentChange }) => {
  if (!selectedElement) return null;

  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    onStyleChange({ [name]: value });
  };

  return (

    <div
      className="d-flex flex-wrap gap-3 align-items-center p-3 border-top bg-white shadow position-fixed bottom-0 start-0 end-0"
      style={{
        zIndex: 999,
        overflowX: 'auto',
        padding: '0px 0px',
        fontSize: '0.875rem',
        height: 'auto'
      }}
    >
      <h5>Edit Element</h5>


      {(selectedElement.type === 'text' || selectedElement.type === 'button') && (
        <Form.Group className="mb-2">
          <Form.Label>Text Content</Form.Label>
          <Form.Control
            type="text"
            value={selectedElement.content}
            onChange={(e) => onContentChange(e.target.value)}
            style={{ width: '80px', fontSize: '0.875rem', padding: '4px' }}
          />
        </Form.Group>
      )}


      <Form.Group className="mb-2">
        <Form.Label>Font Size</Form.Label>
        <Form.Control
          type="number"
          name="fontSize"
          value={parseInt(selectedElement.style.fontSize, 10) || 16}
          onChange={(e) => handleStyleChange({ target: { name: 'fontSize', value: `${e.target.value}px` } })}
          style={{ width: '50px', fontSize: '0.875rem', padding: '4px' }} 
        />
      </Form.Group>


      <Form.Group className="mb-2">
        <Form.Label>Text Color</Form.Label>
        <Form.Control
          type="color"
          name="color"
          value={selectedElement.style.color || '#000000'}
          onChange={handleStyleChange}
          style={{ width: '40px', fontSize: '0.875rem', padding: '4px', }}
        />
      </Form.Group>


      <Form.Group className="mb-2">
        <Form.Label>Background Color</Form.Label>
        <Form.Control
          type="color"
          name="backgroundColor"
          value={selectedElement.style.backgroundColor || '#ffffff'}
          onChange={handleStyleChange}
          style={{ width: '40px', fontSize: '0.875rem', padding: '4px' }} 
        />
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Border Radius</Form.Label>
        <Form.Control
          type="number"
          name="borderRadius"
          value={parseInt(selectedElement.style.borderRadius, 10) || 0}
          onChange={(e) => handleStyleChange({ target: { name: 'borderRadius', value: `${e.target.value}px` } })}
          style={{ width: '50px', fontSize: '0.875rem', padding: '4px' }}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Width (px)</Form.Label>
        <Form.Control
          type="number"
          name="width"
          value={parseInt(selectedElement.style.width, 10) || 0}

          onChange={(e) =>
            handleStyleChange({
              target: { name: 'width', value: `${e.target.value}px` },
            })

          }
          style={{ width: '50px', fontSize: '0.875rem', padding: '4px' }}
        />
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Height (px)</Form.Label>
        <Form.Control
          type="number"
          name="height"
          value={parseInt(selectedElement.style.height, 10) || 100}

          onChange={(e) =>
            handleStyleChange({
              target: { name: 'height', value: `${e.target.value}px` },
            })
          }
          style={{ width: '40px', fontSize: '0.875rem', padding: '4px' }}
        />
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Z-Index</Form.Label>
        <Form.Control
          type="number"
          name="zIndex"
          value={parseInt(selectedElement.style.zIndex, 10) || 1}
          onChange={(e) =>
            handleStyleChange({ target: { name: 'zIndex', value: `${e.target.value}` } })
          }
          style={{ width: '40px', fontSize: '0.875rem', padding: '4px' }} // Smanjen input
        />
      </Form.Group>


      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleStyleChange({ target: { name: 'zIndex', value: 1 } })}
          style={{ padding: '2px 6px', fontSize: '0.75rem' }}
        >
          Send to Back
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleStyleChange({ target: { name: 'zIndex', value: 999 } })}
          style={{ padding: '2px 6px', fontSize: '0.75rem' }}
        >
          Bring to Front
        </Button>
      </div>



      <Button variant="danger" onClick={onDelete} className="w-100">
        Delete Element
      </Button>

    </div>

  );
};

export default EditStyleBar;
