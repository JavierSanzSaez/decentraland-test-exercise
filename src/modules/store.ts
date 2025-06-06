import createSagasMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { reducer } from "./reducer";
import { sagas } from "./sagas";
import { configureStore } from "@reduxjs/toolkit";

const sagasMiddleware = createSagasMiddleware();
const loggerMiddleware = createLogger({
  collapsed: () => true,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagasMiddleware, loggerMiddleware),
});

sagasMiddleware.run(sagas);

export { store };
