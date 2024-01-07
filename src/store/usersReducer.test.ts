import { users, usersActions, UsersPageType } from "./usersReducer";

let state: UsersPageType;
beforeEach(() => {
  state = {
    users: [
      { id: 0, name: "user1", followed: false, photos: { small: "", large: "" }, status: "status 0" },
      { id: 1, name: "user2", followed: false, photos: { small: "", large: "" }, status: "status 1" },
      { id: 2, name: "user3", followed: true, photos: { small: "", large: "" }, status: "status 2" },
      { id: 3, name: "user4", followed: true, photos: { small: "", large: "" }, status: "status 3" },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  };
});

test("follow success", () => {
  const newState = users(state, usersActions.followSuccess(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
  const newState = users(state, usersActions.unfollowSuccess(3));
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[1].followed).toBeFalsy();
});
