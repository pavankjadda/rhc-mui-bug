import { createAction } from "@reduxjs/toolkit";
import { AnyAction, combineReducers, Reducer } from "redux";
import { RootState } from "../store";
import { findProtocolSearchFormReducer } from "./FindProtocolSearchFormReducer";

/**
 * Combine all reducers into Root Reducer
 *
 * @author Pavan Kumar Jadda
 * @since 0.1.0
 */
const allReducers = combineReducers({
  findProtocolSearchForm: findProtocolSearchFormReducer,
});

/**
 * Define Reset Store Form Action
 *
 * @author Pavan Kumar Jadda
 * @since 0.1.0
 */
export const resetReduxStore = createAction("core/resetReduxStore");

/**
 * Reset Store when loaded login page
 *
 * @author Pavan Kumar Jadda
 * @since 0.1.0
 */
export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === resetReduxStore.type) {
    state = undefined;
  }
  return allReducers(state, action);
};
