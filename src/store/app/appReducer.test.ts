import { app, appActions, AppInitialStateType } from "./appReducer";

let state: AppInitialStateType;

beforeEach(() => {
  state = {
    initialized: false,
  };
});

test("initializeApp", () => {
  const newState = app(state, appActions.initializedSuccess());
  expect(newState.initialized).toBe(true);
});
