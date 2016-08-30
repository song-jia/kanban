import React from 'react';

export default ({children, onClick}) => (
  <div onClick={onClick}>
    {children}
  </div>
);
