import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import Chat from './Chat';
import './miniChat.css';
import { Container, Row, Col } from 'react-bootstrap';
import EditStyleBar from '../components/EditStyleBar';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';
import html2canvas from 'html2canvas';







const Dashboard = () => {

  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [zIndexCounter, setZIndexCounter] = useState(1);

  const saveCanvasAsImage = () => {
    const canvasEl = document.querySelector('.canvas');
    if (!canvasEl) return;

    html2canvas(canvasEl).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'my-canvas.jpg';
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.click();
    });
  };
  const updateZIndex = (id) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
            ...el,
            style: {
              ...el.style,
              zIndex: zIndexCounter + 1,
            },
          }
          : el
      )
    );
    setZIndexCounter((prev) => prev + 1);
  };


  const addElement = (elementOrType, file = null) => {
    if (typeof elementOrType === 'object') {
      setElements((prev) => [...prev, elementOrType]);
    } else {
      const newElement = {
        id: uuidv4(),
        type: elementOrType,
        file,
        content: elementOrType === 'image' && file ? URL.createObjectURL(file) : 'Click to edit',
        style: {
          padding: '10px',
          margin: '10px',
          border: '1px solid #ccc',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '150px',
          height: '100px',
          zIndex: zIndexCounter,
        },
      };

      if (elementOrType === 'map') {
        newElement.content =
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.519708011706!2d20.45727331553513!3d44.81540397909867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a656a91e25a3f%3A0x52f03b5c6886d4ed!2sBelgrade!5e0!3m2!1sen!2srs!4v1616412699966!5m2!1sen!2srs';
      }

      setElements((prev) => [...prev, newElement]);
    }
  };


  const updateStyle = (id, newStyles) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, style: { ...el.style, ...newStyles } } : el
      )
    );
  };


  const updateContent = (id, newContent) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content: newContent } : el))
    );
  };

  const updateElementPosition = (id, offsetX, offsetY) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
            ...el,
            style: {
              ...el.style,
              left: `${offsetX}px`,
              top: `${offsetY}px`,
            }
          }
          : el
      )
    );
  };


  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedElementId(null);
  };


  const updateElementSize = (id, width, height) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
            ...el,
            style: {
              ...el.style,
              width: `${width}px`,
              height: `${height}px`,
            },
          }
          : el
      )
    );
  };


  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };


  const selectedElement = useMemo(() => {
    return elements.find((el) => el.id === selectedElementId);
  }, [elements, selectedElementId]);

  return (
    <Container fluid className="dashboard-wrapper p-0 vh-100">
      <Row className="h-100">
        {/* Sidebar */}
        <Col xs={12} md={3} className="sidebar-wrapper p-0 border-end overflow-auto">
          <Sidebar
            onAddElement={addElement}
            selectedElement={selectedElement}
            onStyleChange={(styles) => updateStyle(selectedElementId, styles)}
            onDeleteElement={deleteElement}
            onContentChange={updateContent}
            saveCanvas={saveCanvasAsImage}
          />
        </Col>

        <Col
          xs={12}
          md={9}
          className="canvas-wrapper p-0"
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
          }}
        >
          <Canvas
            elements={elements}
            onElementClick={(id) => setSelectedElementId(id)}
            selectedElementId={selectedElementId}
            updateElementPosition={updateElementPosition}
            updateElementSize={updateElementSize}
            onContentChange={updateContent}
            updateZIndex={updateZIndex}
          />


          {selectedElement && (
            <EditStyleBar
              selectedElement={selectedElement}
              onStyleChange={(styles) => updateStyle(selectedElementId, styles)}
              onDelete={() => deleteElement(selectedElementId)}
              onContentChange={(newContent) => updateContent(selectedElementId, newContent)}
            />
          )}

          <button onClick={toggleChat} className="mini-chat-toggle-btn">
            {isChatOpen ? 'Close Chat' : 'Open Chat'}
          </button>


          {isChatOpen && (
            <div className="mini-chat-container">
              <div className="mini-chat-header">Mini Chat</div>
              <div className="mini-messages-container">
                <Chat miniChat={true} />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
