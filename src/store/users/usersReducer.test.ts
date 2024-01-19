import { FilterType, users, usersActions, UsersInitialStateType, UserType } from "./usersReducer";

let state: UsersInitialStateType;
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
    filter: { term: "", friend: null },
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

test("set users", () => {
  const newUsers: UserType[] = [
    { id: 4, name: "user5", followed: true, photos: { small: "", large: "" }, status: "status 4" },
    { id: 5, name: "user6", followed: false, photos: { small: "", large: "" }, status: "status 5" },
  ];

  const newState = users(state, usersActions.setUsers(newUsers));
  expect(newState.users.length).toBe(2);
  expect(newState.users[0].id).toBe(4);
});

test("set current page", () => {
  const newState = users(state, usersActions.setCurrentPage(2));
  expect(newState.currentPage).toBe(2);
});

test("set total users count", () => {
  const newState = users(state, usersActions.setTotalUsersCount(10));
  expect(newState.totalUsersCount).toBe(10);
});

test("set term in filter", () => {
  const newTerm = "Anna";
  const newState = users(state, usersActions.setFilter({ ...state.filter, term: newTerm }));

  expect(newState.filter.term).toBe(newTerm);
  expect(newState.filter.friend).toBe(state.filter.friend);
});

test("set friend in filter", () => {
  const newState = users(state, usersActions.setFilter({ ...state.filter, friend: true }));

  expect(newState.filter.friend).toBe(true);
  expect(newState.filter.term).toBe(state.filter.term);
});

test("set isFetching", () => {
  const newState = users(state, usersActions.toggleIsFetching(true));
  expect(newState.isFetching).toBe(true);
});

test("set userID in followingProgress", () => {
  const newState = users(state, usersActions.toggleIsFollowingProgress(true, 0));
  expect(newState.followingInProgress.length).toBe(1);
  expect(newState.followingInProgress[0]).toBe(0);
});

test("remove userID from followingProgress", () => {
  state.followingInProgress.push(3);
  const newState = users(state, usersActions.toggleIsFollowingProgress(false, 3));
  expect(newState.followingInProgress.length).toBe(0);
});
