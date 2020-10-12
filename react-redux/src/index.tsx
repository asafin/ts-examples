import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as StoreProvider} from 'react-redux'
import * as mui from "@material-ui/core";
import './index.scss';
import Application from "./Application"
import theme from "./services/theme";
import {configureStore} from "./store"

const store = configureStore()

ReactDOM.render(
    <mui.ThemeProvider theme={theme}>
        <StoreProvider store={store}>
            <Application />
        </StoreProvider>
    </mui.ThemeProvider>, document.getElementById('root'));