import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider as StoreProvider} from 'react-redux';
import './assets/styles/index.scss';
import {Application} from './app/Application';
import {configureStore} from "./store"

const store = configureStore()


ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
        <Application />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
