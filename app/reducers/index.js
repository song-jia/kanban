import uuid from 'uuid';
import {
  ADD_NOTE,
  DELETE_NOTE,
  ACTIVATE_NOTE_EDIT,
  EDIT_NOTE} from '../actions';

const app = (state = {
  notes: [
    {
      id: uuid.v4(),
      task: 'Learn React'
    },
    {
      id: uuid.v4(),
      task: 'Do laundry'
    }
  ]
}, action) => {
  switch (action.type) {
    case ADD_NOTE:
    return addNote(state, action);
    case DELETE_NOTE:
    return deleteNote(state, action);
    case ACTIVATE_NOTE_EDIT:
    return activateNoteEdit(state, action);
    case EDIT_NOTE:
    return editNote(state, action);
    default:
      return state;
  }
}

function addNote (state, action) {
  return {
    ...state,
    notes: state.notes.concat([{
      id: uuid.v4(),
      task: 'New task'
    }])
  };
}

function deleteNote (state, action) {
  return {
    ...state,
    notes: state.notes.filter(note => note.id !== action.id)
  }
}

function activateNoteEdit (state, action) {
  return {
    ...state,
    notes: state.notes.map(note => {
        if (note.id === action.id) {
          note.editing = true;
        }
        return note;
      })
  }
}

function editNote (state, action) {
  return {
    ...state,
    notes: state.notes.map(note => {
        if (note.id === action.id) {
          note.editing = false;
          note.task = action.task;
        }
        return note;
    })
  }
}
export default app;
