import * as actions from '../app/actions';
import {assert} from 'chai';

describe('actions', () => {
  it('should create ADD_LANE action', () => {
    const action = actions.addLane();
    assert.equal(action.type, 'ADD_LANE');
    assert.isString(action.id);
  });
});
