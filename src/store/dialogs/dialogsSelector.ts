import { AppStateType } from "../store";
import { DialogsStateType } from "./dialogsReducer";

export const selectDialogs = (state: AppStateType): DialogsStateType => state.dialogs;
