import React from 'react';

const Note = ({children, onClick, className}) => (
  <div className={className} onClick={onClick}>
    {children}
  </div>
);
export default Note;
