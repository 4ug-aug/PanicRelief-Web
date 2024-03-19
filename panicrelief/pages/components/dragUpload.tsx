import React, { DragEvent, useState, useEffect } from "react";

const hoverEffect = {
  backgroundColor: 'rgba(0,0,0,0.3)',
  color: 'white',
  fontSize: '24px',
  border: '0.2rem dashed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '95vh',
  width: '95vw',
  position: 'fixed',
  top: '2.5vh',
  left: '2.5vw',
  zIndex: 9999,
};

const FileDrop = ({ onFiles: onFiles, onRemove: onRemove }: { onFiles: (files: any) => void; onRemove: (index: number) => void }) => {
  const [isOver, setIsOver] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const handleDragOver = (event: any) => {
      event.preventDefault();
      setIsOver(true);
    };

    const handleDrop = (event: any) => {
      event.preventDefault();
      setIsOver(false);
      const files = Array.from(event.dataTransfer.files);
      processFiles(files);
      onFiles(files);
    };

    const handlePaste = (event: any) => {
      const items = event.clipboardData.items;
      const files = [];
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          files.push(file);
        }
      }
      if (files.length > 0) {
        processFiles(files);
      }
    };

    const processFiles = (files: any) => {
      files.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => setImagePreviews((prev) => [...prev, e.target.result] as any);
        reader.readAsDataURL(file);
      });

      onFiles(files);
    };

    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('paste', handlePaste);
    

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    onRemove(index);
  };

  return (
    <div>
      {isOver && <div style={hoverEffect as any}>Drop files here to upload</div>}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {imagePreviews.map((image, index) => (
          <div key={index} onClick={() => removeImage(index)} style={{cursor: 'pointer'}}>
            <img src={image} alt={`Preview ${index}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDrop;
