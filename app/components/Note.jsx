import React from 'react';
import {DragSource} from 'react-dnd';

const Note = ({connectDragSource, children, onClick, className}) => (
  connectDragSource(
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
);

const noteSource = {
  beginDrag(props) {
    console.log('begin dragging note', props);
    return {};
  }
};

export default DragSource(
  'note',
  noteSource,
  connect => ({
    connectDragSource: connect.dragSource()
  })
)(Note);
