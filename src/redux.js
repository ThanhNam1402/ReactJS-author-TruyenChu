import thunk from "redux-thunk";
import { routerMiddleware } from 'connected-react-router';

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';


import createRootReducer from './store/reducers/rootReducer';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

const rootReducer = createRootReducer(history);
const middleware = [
    thunk,
    routerMiddleware(history),
]

const reduxStore = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware)
    ),
)

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;