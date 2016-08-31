import {combineReducers} from 'redux';
import lanes from './lanes';
import notes from './notes';

const app = combineReducers({lanes, notes});
export default app;
