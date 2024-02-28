import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import reduxStore, { persistor } from './redux';


import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme';
import { Provider } from 'react-redux';

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <App persistor={persistor} />
            </CssVarsProvider>
        </Provider >,
        document.getElementById('root')
    );
};

renderApp();

serviceWorker.unregister();
