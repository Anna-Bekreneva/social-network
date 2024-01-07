import { follow, unfollow, usersActions } from "./usersReducer";
import { APIResponseType, ResultCode, usersAPI } from "../api";
jest.mock("../api/usersAPI");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: APIResponseType = {
  resultCode: ResultCode.Success,
  messages: [],
  data: {},
};

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAPIMock.follow.mockClear();
  userAPIMock.unfollow.mockClear();
});

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
test("success follow thunk", async () => {
  const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleIsFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleIsFollowingProgress(false, 1));
});

// test("success unfollow thunk", async () => {
//   const thunk = unfollow(1);
//
//   await thunk(dispatchMock, getStateMock, {});
//
//   expect(dispatchMock).toBeCalledTimes(3);
//   expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleIsFollowingProgress(true, 1));
//   expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollowSuccess(1));
//   expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleIsFollowingProgress(false, 1));
// });
