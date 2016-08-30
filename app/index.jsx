import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';

if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
