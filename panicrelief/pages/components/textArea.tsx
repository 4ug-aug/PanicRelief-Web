import React, { useEffect, useRef } from 'react';
import { TextArea } from '@radix-ui/themes';



const ResizableTextArea = ({ value, onChange, ...props }: { value: string, onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void, [key: string]: any }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    const textArea = textAreaRef.current as any;
    if (textArea) {
      textArea.style.height = 'auto'; // Reset the height to recalculate
      textArea.style.height = `${textArea.scrollHeight}px`; // Set height to scroll height to expand as needed
    }
  }, [value]); // Recalculate on value change

  return (
    <TextArea
      ref={textAreaRef}
      value={value}
      onChange={onChange}
      {...props}
      style={{ overflow: 'hidden', resize: 'none', ...props.style }} // Apply any passed styles
    />
  );
};

export default ResizableTextArea;
