import { dialogs, dialogsActions, DialogsStateType } from "./dialogsReducer";

let state: DialogsStateType;

beforeEach(() => {
  state = {
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
});

test("", () => {
  const newMessageBody = " It's my new message ";
  const newState = dialogs(state, dialogsActions.sendMessage(newMessageBody));

  expect(newState.messages.length).toBe(5);
  expect(newState.messages[4].message).toBe(newMessageBody);
});
