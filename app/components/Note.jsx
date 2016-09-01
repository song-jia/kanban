import {compose} from 'redux';
import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';

const Note = ({connectDragSource, connectDropTarget, onMove, id, children,
  onClick, className, isDragging, isOver, editing}) => {
  const dragSource = editing ?
          a => a // cannot drag while editing
          : connectDragSource;
  return compose(dragSource, connectDropTarget)(
    <div
      style={{opacity: isDragging || isOver ? 0 : 1}}
      className={className}
      onClick={onClick}>
      {children}
    </div>
  )
};

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    if (sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
}

export default compose(
  DragSource(
    'note',
    noteSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  ),
  DropTarget(
    'note',
    noteTarget,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    })
  )
)(Note);
