import React from 'react';
import Notes from './Notes';
import LaneHeader from './LaneHeader';
import {activateNoteEdit, editNote,deleteNote, detachNoteFromLane,
  deleteLane} from '../actions';
import {connect} from 'react-redux';

class Lane extends React.Component {

  render() {
    const {lane, laneNotes} = this.props;
    return (
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
