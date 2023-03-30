import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./reducers/RootReducer";

/**
 * Configure Global Redux store
 *
 * @author Pavan Kumar Jadda
 * @since 0.1.0
 */
export const store = configureStore({
  reducer: rootReducer,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
