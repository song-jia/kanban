import React from 'react';
import uuid from 'uuid';
import Notes from '../components/Notes';
import {connect} from 'react-redux';
import {addNote, deleteNote, activateNoteEdit, editNote} from '../actions';

class App extends React.Component {

  render() {
    const {notes} = this.props;

    return (
      <div>
        <button onClick={this.props.addNote} className='add-note'>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.props.activateNoteEdit}
          onDelete={this.deleteNote}
          onEdit={this.props.editNote} />
      </div>
    );
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();
    this.props.deleteNote(id);
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    addNote () {
      dispatch(addNote());
    },
    deleteNote (id) {
      dispatch(deleteNote(id));
    },
    activateNoteEdit (id) {
      dispatch(activateNoteEdit(id));
    },
    editNote (id, task) {
      dispatch(editNote(id, task));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
