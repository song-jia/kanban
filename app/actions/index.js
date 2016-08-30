export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ACTIVATE_NOTE_EDIT = 'ACTIVATE_NOTE_EDIT';
export const EDIT_NOTE = 'EDIT_NOTE';

export const addNote = function () {
  return {
    type: ADD_NOTE
  };
}

export const deleteNote = function (id) {
  return {
    type: DELETE_NOTE,
    id: id
  };
}

export const activateNoteEdit = function (id) {
  return {
    type: ACTIVATE_NOTE_EDIT,
    id: id
  };
}

export const editNote = function (id, task) {
  return {
    type: EDIT_NOTE,
    id: id,
    task: task
  }
}
