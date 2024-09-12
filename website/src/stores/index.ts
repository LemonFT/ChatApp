import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import messageSaga from "./sagas/messageSaga";
import themeReducer from "./slices/themeSlice";
import messageReducer from "./slices/messageSlice";

function* rootSaga() {
    yield all([
      messageSaga(),
    ]);
  }

const rootReducer = combineReducers({
    theme: themeReducer,
    message: messageReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;