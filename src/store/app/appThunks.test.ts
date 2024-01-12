import { initializeApp } from "./appReducer";

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

test("initializeApp", async () => {
  const thunk = initializeApp();
  await thunk(dispatchMock, getStateMock, {});

  // todo: how check when promise is resolved, we dispatch appActions.initializedSuccess()
  expect(dispatchMock).toBeCalledTimes(1);
});
