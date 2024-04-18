import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from "./userReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoginRedux', 'userInfo']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
})