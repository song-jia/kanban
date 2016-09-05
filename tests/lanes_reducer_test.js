import reducer from '../app/reducers/lanes';
import {assert} from 'chai';

describe('lanes reducer', () => {
  it('initial lanes store', () => {
    const initialStore = reducer(undefined, {});
    assert.isArray(initialStore);
    assert.equal(0, initialStore.length);
  });
  it('add lane', () => {
    const state = reducer([], {type: 'ADD_LANE', id: '1'});
    assert.deepEqual(state[0], {id: '1', name: 'new lane', notes: []});
  });
});
