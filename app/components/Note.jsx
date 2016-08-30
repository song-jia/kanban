import React from 'react';

export default ({children, onClick, className}) => (
  <div className={className} onClick={onClick}>
    {children}
  </div>
);
