import {ADD_LANE, ATTACH_NOTE_TO_LANE, DETACH_NOTE_FROM_LANE, UPDATE_LANE,
   DELETE_LANE, MOVE_NOTE} from '../actions';
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
    case MOVE_NOTE:
      return moveNote(state, action);
    default:
      return state;
  }
};

function addLane(state, action) {
  return state.concat({
    id: action.id,
    name: 'new lane',
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

function moveNote (state, action) {
  const {sourceId, targetId} = action;
  const sourceLane = state.filter(lane => lane.notes.includes(sourceId))[0];
  const targetLane = state.filter(lane => lane.notes.includes(targetId))[0];
  const sourceNoteIndex = sourceLane.notes.indexOf(sourceId)
  const targetNoteIndex = targetLane.notes.indexOf(targetId);
  if (sourceLane === targetLane) {
    // adjust sort of notes.
    return state.map(lane => {
      if (lane.id !== sourceLane.id) {
        return lane;
      }
      let notes = [...sourceLane.notes];
      notes.splice(sourceNoteIndex, 1);
      notes.splice(targetNoteIndex, 0, sourceId);
      return {
        ...lane,
        notes: notes
      }
    });
  } else {
    // move note from one lane to another.
    return state.map(lane => {
      if (lane.id === sourceLane.id) {
        // remove from source lane.
        let notes = [...sourceLane.notes];
        notes.splice(sourceNoteIndex, 1);
        return {
          ...lane,
          notes: notes
        }
      }
      if (lane.id === targetLane.id) {
        // attach to target lane.
        let notes = [...targetLane.notes];
        notes.splice(targetNoteIndex, 0, sourceId);
        return {
          ...lane,
          notes: notes
        }
      }
      return lane;
    });
  }
}
export default lanes;
