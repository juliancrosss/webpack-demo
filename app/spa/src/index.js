import React from 'react';
import { render } from 'react-dom';
//import { Provider } from 'react-redux';
//import { createStore } from 'redux';
//import todoApp from './reducers';
//import App from './components/App';
import App from './components/App';


let element = document.createElement('div');
element.setAttribute('id', 'app');
document.body.appendChild(element);

//let store = createStore(todoApp);
/*
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)*/

render(<App />,document.getElementById('app'));
