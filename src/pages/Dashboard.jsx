import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";


const Dashboard = () => {
  const canvasRef = useRef(null);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
  
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   
 
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    
      <div className="mb-3"
       >
      <Button
  onClick={clearCanvas}
  className="mx-2"
  style={{ backgroundColor: "#6f42c1", color: "white" }}
>
          Clear Canvas
        </Button>
        <Button onClick={saveCanvas} className="mx-2" style={{ backgroundColor: "#6f42c1", color: "white" }}>
          Save Canvas
        </Button>
      </div>
      
    
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "5px solid #6f42c1" }}
      />
    </div>
  );
};

export default Dashboard;
