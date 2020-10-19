import React from 'react';
import ReactDOM from 'react-dom';
import Index from './App';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from "./GlobalStyle";
import { RecoilRoot } from 'recoil'

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <Index />
    </RecoilRoot>
  </React.StrictMode>,
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
