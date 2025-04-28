
import React, { useRef } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import { Button, Row, Col} from 'react-bootstrap';





const Sidebar = ({ onAddElement, saveCanvas }) => {
  const fileInputRef = useRef(null);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageElement = {
          id: uuidv4(),
          type: 'image',
          content: reader.result,
          style: {
            left: '100px',
            top: '100px',
            width: '200px',
            height: '200px',
            backgroundColor: 'transparent',
          },
        };
        onAddElement(newImageElement);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };


  return (
    <div className="p-3 bg-light border-end" style={{ minWidth: '250px' }}>
      <h4 className="mb-3">TOOLS</h4>


      <div className="mb-4">
        <Row className="g-2">


          <Col xs={12}>
            <Button
              variant="warning"
              onClick={() => {
                const newTextElement = {
                  id: uuidv4(),
                  type: 'text',
                  content: 'Click to edit',
                  style: {
                    left: '100px',
                    top: '100px',
                    width: '200px',
                    height: 'auto',
                    fontSize: '16px',
                    color: '#000',
                  },
                };
                onAddElement(newTextElement);
              }}
              className="w-100"
            >
              Add Text
            </Button>
          </Col>


          <Col xs={12}>
            <Button
              variant="warning"
              onClick={() => {
                const newButtonElement = {
                  id: uuidv4(),
                  type: 'button',
                  content: 'Click me',
                  style: {
                    left: '100px',
                    top: '100px',
                    width: '150px',
                    height: '50px',
                    fontSize: '16px',
                    color: '#ffffff',
                    backgroundColor: '#007bff',
                    borderRadius: '8px',
                  },
                };
                onAddElement(newButtonElement);
              }}
              className="w-100"
            >
              Add Button
            </Button>
          </Col>

          <Col xs={12}><Button variant="warning" onClick={handleAddImageClick} className="w-100">Add Image</Button></Col>
          <Col xs={12}><Button variant="warning" onClick={() => onAddElement('div')} className="w-100">Add Division</Button></Col>
          <Col xs={12}><Button variant="warning" onClick={() => onAddElement('map')} className="w-100">Add Map</Button></Col>
          <Col xs={12}><Button variant="danger" onClick={saveCanvas} className="w-100 mt-3">
            Save Canvas as JPG
          </Button>
          </Col>
        </Row>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};


export default Sidebar;
