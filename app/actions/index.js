import uuid from 'node-uuid';

export const ADD_NOTE = 'ADD_NOTE';
export const addNote = function () {
  return {
    type: ADD_NOTE,
    id: uuid.v4()
  };
};
export const DELETE_NOTE = 'DELETE_NOTE';
export const deleteNote = function (id) {
  return {
    type: DELETE_NOTE,
    id: id
  };
};
export const ACTIVATE_NOTE_EDIT = 'ACTIVATE_NOTE_EDIT';
export const activateNoteEdit = function (id) {
  return {
    type: ACTIVATE_NOTE_EDIT,
    id: id
  };
};
export const EDIT_NOTE = 'EDIT_NOTE';
export const editNote = function (id, task) {
  return {
    type: EDIT_NOTE,
    id: id,
    task: task
  };
};
export const ADD_LANE = 'ADD_LANE';
export const addLane = function () {
  return {
    type: ADD_LANE
  };
};
export const ATTACH_NOTE_TO_LANE = 'ATTACH_NOTE_TO_LANE';
export const attachNoteToLane = function (laneId, noteId) {
  return {
    type: ATTACH_NOTE_TO_LANE,
    laneId: laneId,
    noteId: noteId
  }
};
export const DETACH_NOTE_FROM_LANE = 'DETACH_NOTE_FROM_LANE';
export const detachNoteFromLane = function(laneId, noteId) {
  return {
    type: DETACH_NOTE_FROM_LANE,
    laneId: laneId,
    noteId: noteId
  }
}
export const UPDATE_LANE = 'EDIT_LANE_NAME';
export const updateLane = function (laneId, data) {
  return {
    type: UPDATE_LANE,
    laneId: laneId,
    data: data
  }
}
export const DELETE_LANE = 'DELETE_LANE';
export const deleteLane = function (id) {
  return {
    type: DELETE_LANE,
    id: id
  };
}
export const MOVE_NOTE = 'MOVE_NOTE';
export const moveNote = function ({sourceId, targetId}) {
  return {
    type: MOVE_NOTE,
    sourceId: sourceId,
    targetId: targetId
  }
}
