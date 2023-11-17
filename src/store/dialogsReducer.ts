import { InferActionsTypes } from "./";

const initialState = {
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Viktor" },
    { id: 6, name: "Valera" },
  ],

  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
  ],
};

export const dialogs = (state: DialogsStateType = initialState, action: ActionsTypeDialogs): DialogsStateType => {
  switch (action.type) {
    case "dialogs/SEND-MESSAGE":
      return { ...state, messages: [...state.messages, { id: 6, message: action.newMessageBody }] };
    default:
      return state;
  }
};

export const dialogsActions = {
  sendMessage: (newMessageBody: string) => ({
    type: "dialogs/SEND-MESSAGE" as const,
    newMessageBody,
  }),
};

export type DialogsStateType = typeof initialState;
type ActionsTypeDialogs = InferActionsTypes<typeof dialogsActions>;
