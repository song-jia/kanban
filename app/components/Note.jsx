import {compose} from 'redux';
import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';

class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, onMove, id, children,
      className, isDragging, isOver, editing} = this.props;

    const dragSource = editing ?
      a => a // cannot drag while editing
      : connectDragSource;
    return compose(dragSource, connectDropTarget)(
      <div
        style={{opacity: isDragging || isOver ? 0 : 1}}
        className={className}>
        {children}
      </div>
    )
  }
}

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
