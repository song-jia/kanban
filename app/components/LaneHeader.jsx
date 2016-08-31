import React from 'react';
import {connect} from 'react-redux';
import Editable from './Editable';
import {addNote, attachNoteToLane, updateLane} from '../actions';

class LaneHeader extends React.Component {
  render () {
    const {lane, deleteLane} = this.props;
    return (
      <div
        className='lane-header'
        onClick={this.updateEditing}>
        <div className='lane-add-note'>
          <button onClick={this.addNote}>+</button>
        </div>
        <Editable
          className='lane-name'
          editing={lane.editing}
          value={lane.name}
          onEdit={this.onEdit} />
        <div className="lane-delete">
          <button onClick={deleteLane}>x</button>
        </div>
      </div>
    )
  }

  addNote = (e) => {
    e.stopPropagation();
    let note = this.props.addNote();
    this.props.attachNoteToLane(this.props.lane.id, note.id);
  }

  updateEditing = () => {
    this.props.updateLane(this.props.lane.id, {editing: true});
  }

  onEdit = (value) => {
    this.props.updateLane(this.props.lane.id, {editing: false, name: value});
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNote () {
      let action = addNote();
      dispatch(action);
      return action;
    },
    attachNoteToLane (laneId, noteId) {
      dispatch(attachNoteToLane(laneId, noteId));
    },
    updateLane (laneId, data) {
      dispatch(updateLane(laneId, data));
    }
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(LaneHeader);
