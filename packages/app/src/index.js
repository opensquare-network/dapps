import React from 'react';
import ReactDOM from 'react-dom';
import Index from './App';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from "./GlobalStyle";
import { Provider } from 'react-redux'
import store from './store'

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <Index />
    </Provider>
  </React.StrictMode>,
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
