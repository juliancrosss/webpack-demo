import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

let store = createStore(todoApp);
let element = document.createElement('div');
element.setAttribute('id', 'root');
document.body.appendChild(element); 

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);