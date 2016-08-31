import {ADD_LANE, ATTACH_NOTE_TO_LANE, DETACH_NOTE_FROM_LANE, UPDATE_LANE,
   DELETE_LANE} from '../actions';
import uuid from 'node-uuid';

const lanes = (state = [], action) => {
  switch (action.type) {
    case ADD_LANE:
      return addLane(state, action);
    case ATTACH_NOTE_TO_LANE:
      return attachNoteToLane(state, action);
    case DETACH_NOTE_FROM_LANE:
      return detachNoteFromLane(state, action);
    case UPDATE_LANE:
      return editLane(state, action);
    case DELETE_LANE:
      return deleteLane(state, action);
    default:
      return state;
  }
};

function addLane(state) {
  return state.concat({
    id: uuid.v4(),
    name: 'new Lane',
    notes: []
  });
}

function attachNoteToLane(state, action) {
  const {laneId, noteId} = action;
  return state.map(lane => {
    // attach note.
    if (lane.id === laneId) {
      return {
        ...lane,
        notes:[...lane.notes, noteId]
      };
    }
    // remove note from other lanes if note had been existed.
    const index = lane.notes.indexOf(noteId);
    if (index >= 0) {
      return {
        ...lane,
        notes: [...lane.notes.slice(0, index), ...lane.notes.slice(index + 1)]
      };
    }
    return lane;
  }
  );
}

function detachNoteFromLane(state, action) {
  const {laneId, noteId} = action;
  return state.map(lane => {
    if (lane.id === laneId) {
      return {
        ...lane,
        notes: lane.notes.filter(id => id !== noteId)
      };
    }
    return lane;
  });
}

function editLane (state, action) {
  return state.map(lane => {
    if (lane.id === action.laneId) {
      return {
        ...lane,
        ...action.data
      }
    }
    return lane;
  })
}

function deleteLane (state, action) {
  return state.filter(lane => lane.id !== action.id);
}
export default lanes;
