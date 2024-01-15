import { AppStateType } from "../store";

export const selectApp = (state: AppStateType): boolean => state.app.initialized;
