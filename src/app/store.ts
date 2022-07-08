import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/counter/counterSlice";
import userReducer from "../features/userSlice";
import playerReducer from "../features/playerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    player: playerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
