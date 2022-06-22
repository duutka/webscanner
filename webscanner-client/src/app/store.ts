import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { scannerReducer } from "./scanner/scannerReducer";
import { navigatorReducer } from "./navigator/navigatorReducer";

const rootReducer = combineReducers({
  scanner: scannerReducer,
  navigator: navigatorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
