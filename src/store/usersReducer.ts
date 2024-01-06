import { BaseThunkType, InferActionsTypes } from "./store";

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

type ActionsTypeUser = InferActionsTypes<typeof usersActions>;

export const usersActions = {
  followSuccess: (userId: number) => ({ type: "users/FOLLOW", userId }) as const,

  unfollowSuccess: (userId: number) => ({ type: "users/UNFOLLOW", userId }) as const,

  setUsers: (users: Array<UserType>) => ({ type: "users/SET-USERS", users }) as const,

  setCurrentPage: (currentPage: number) => ({ type: "users/SET-CURRENT-PAGE", currentPage }) as const,

  setTotalUsersCount: (usersCount: number) => ({ type: "users/SET-TOTAL-USERS-COUNT", usersCount }) as const,

  toggleIsFetching: (isFetching: boolean) => ({ type: "users/TOGGLE-IS-FETCHING", isFetching }) as const,

  toggleIsFollowingProgress: (isFollowing: boolean, userId: number) =>
    ({
      type: "users/TOGGLE-IS-FOLLOWING-PROGRESS",
      isFollowing,
      userId,
    }) as const,
};

export const requestUsers = (page: number, pageSize: number): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true));
    dispatch(usersActions.setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);
    dispatch(usersActions.toggleIsFetching(false));
    dispatch(usersActions.setUsers(data.data.items));
    dispatch(usersActions.setTotalUsersCount(data.data.totalCount));
  };
};

// Resolve followUnfollowFlow / follow / unfollow

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(usersActions.toggleIsFollowingProgress(true, userId));
  const response = await apiMethod(userId);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(usersActions.toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    const actionCreator = usersActions.followSuccess;

    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};

export const unfollow = (userId: number): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);
    const actionCreator = usersActions.unfollowSuccess;

    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};
