import { ThunkAction } from "redux-thunk";

import { AppStateType } from "./store";

import { usersAPI } from "api";
import { updateObjectInArray } from "utils";

export type UsersPageType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

export type UserType = {
  followed: boolean;
  id: number;
  name: string;
  status: string;
  uniqueUrlName: string;
  photos: PhotosType;
};

type PhotosType = {
  large: string;
  small: string;
};

const initialState: UsersPageType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const users = (state: UsersPageType = initialState, action: ActionsTypeUser): UsersPageType => {
  switch (action.type) {
    case "users/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "users/UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "users/SET-USERS":
      return { ...state, users: [...action.users, ...state.users] };
    case "users/SET-CURRENT-PAGE":
      return { ...state, currentPage: action.currentPage };
    case "users/SET-TOTAL-USERS-COUNT":
      return { ...state, totalUsersCount: action.usersCount };
    case "users/TOGGLE-IS-FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "users/TOGGLE-IS-FOLLOWING-PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFollowing
          ? [...state.followingInProgress, action.userId]
          : [...state.followingInProgress.filter((id) => id !== action.userId)],
      };
    }
    default:
      return state;
  }
};

type ActionsTypeUser =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleIsFollowingProgress>;

export const followSuccess = (userId: number) => ({ type: "users/FOLLOW", userId }) as const;

export const unfollowSuccess = (userId: number) => ({ type: "users/UNFOLLOW", userId }) as const;

export const setUsers = (users: Array<UserType>) => ({ type: "users/SET-USERS", users }) as const;

export const setCurrentPage = (currentPage: number) => ({ type: "users/SET-CURRENT-PAGE", currentPage }) as const;

export const setTotalUsersCount = (usersCount: number) =>
  ({ type: "users/SET-TOTAL-USERS-COUNT", usersCount }) as const;

export const toggleIsFetching = (isFetching: boolean) => ({ type: "users/TOGGLE-IS-FETCHING", isFetching }) as const;

export const toggleIsFollowingProgress = (isFollowing: boolean, userId: number) =>
  ({
    type: "users/TOGGLE-IS-FOLLOWING-PROGRESS",
    isFollowing,
    userId,
  }) as const;

export type ThunkTypeUsers = ThunkAction<void, AppStateType, unknown, ActionsTypeUser>;

export const requestUsers = (page: number, pageSize: number): ThunkTypeUsers => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleIsFollowingProgress(true, userId));
  const response = await apiMethod(userId);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkTypeUsers => {
  return async (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    const actionCreator = followSuccess;

    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};

export const unfollow = (userId: number): ThunkTypeUsers => {
  return async (dispatch) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);
    const actionCreator = unfollowSuccess;

    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};
