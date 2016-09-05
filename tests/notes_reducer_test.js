import reducer from '../app/reducers/notes';
import {assert} from 'chai';

describe('notes reducer', () => {
  it('initial notes store', () => {
    const initialStore = reducer(undefined, {});
    assert.isArray(initialStore);
    assert.equal(0, initialStore.length);
  });
  it('add new note', () => {
    const state = reducer([], {type: 'ADD_NOTE', id: '1'});
    assert.deepEqual(state[0], {id: '1', task: 'New task'});
  });
  it('delete note', () => {
    let initState = [
      {id: '1', task: 'task 1'},
      {id: '2', task: 'task 2'},
      {id: '3', task: 'task 3'}
    ];
    const state = reducer(initState, {type: 'DELETE_NOTE', id: '2'});
    assert.equal(state.length, 2);
    assert.equal(state[0].id, '1');
    assert.equal(state[1].id, '3');
  });
  it('activate note editing', () => {
    let initState = [
      {id: '1', task: 'task 1'},
      {id: '2', task: 'task 2'}
    ];
    const state = reducer(initState, {type: 'ACTIVATE_NOTE_EDIT', id: '2'});
    assert.equal(initState[1].editing, true);
  });
  it('edit note', () => {
    let initState = [
      {id: '1', task: 'task 1'},
      {id: '2', task: 'task 2'}
    ];
    const state = reducer(initState, {type: 'EDIT_NOTE', id: '2', task: 'new content'});
    assert.equal(initState[1].task, 'new content');
  });
});
