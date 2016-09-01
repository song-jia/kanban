import {compose} from 'redux';
import {DropTarget} from 'react-dnd';
import React from 'react';
import Notes from './Notes';
import LaneHeader from './LaneHeader';
import {activateNoteEdit, editNote,deleteNote, detachNoteFromLane,
  deleteLane, moveNote, attachNoteToLane} from '../actions';
import {connect} from 'react-redux';

class Lane extends React.Component {

  render() {
    const {lane, laneNotes, connectDropTarget} = this.props;
    return connectDropTarget(
      <div className='lane'>
        <LaneHeader
          lane={lane}
          addNote={this.addNote}
          deleteLane={this.deleteLane}
        />
        <Notes
          notes={laneNotes}
          onNoteClick={this.props.activateNoteEdit}
          onEdit={this.props.editNote}
          onDelete={this.onDeleteNote}
          onMove={this.props.moveNote}
        />
      </div>
    );
  }

  onDeleteNote = (id) => {
    this.props.deleteNote(id);
    this.props.detachNoteFromLane(this.props.lane.id, id);
  }

  deleteLane = () => {
    // delete all notes of lane.
    this.props.lane.notes.forEach(id => {
      this.onDeleteNote(id);
    });
    this.props.deleteLane(this.props.lane.id);
  }
}

Lane.propTypes = {
  lane: React.PropTypes.object
};

function findNotesByIds(ids, notes) {
  return ids.map(id => {
    let index = 0;
    let found = notes.some((note, idx) => {
      index = idx;
      return note.id === id;
    });
    if (found) {
      return notes[index];
    }
    return null;
  });
}

function mapStateToProps(state, props) {
  return {
    laneNotes: findNotesByIds(props.lane.notes, state.notes)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    detachNoteFromLane (laneId, noteId) {
      dispatch(detachNoteFromLane(laneId, noteId));
    },
    activateNoteEdit (id) {
      dispatch(activateNoteEdit(id));
    },
    editNote (id, task) {
      dispatch(editNote(id, task));
    },
    deleteNote (id) {
      dispatch(deleteNote(id));
    },
    deleteLane (id) {
      dispatch(deleteLane(id));
    },
    moveNote (ids) {
      dispatch(moveNote(ids));
    },
    attachNoteToLane (laneId, noteId) {
      dispatch(attachNoteToLane(laneId, noteId));
    }
  }
}

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (!targetProps.lane.notes.length) {
      targetProps.attachNoteToLane(targetProps.lane.id, sourceId);
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  DropTarget(
    'note',
    noteTarget,
    connect => ({
      connectDropTarget: connect.dropTarget()
    }))
)(Lane);
