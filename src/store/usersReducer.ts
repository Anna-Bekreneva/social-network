import { BaseThunkType, InferActionsTypes } from "./store";

import { APIResponseType, usersAPI } from "api";
import { updateObjectInArray } from "utils";
import { Dispatch } from "redux";

export type UsersPageType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  followed: boolean;
  photos: PhotosType;
};

export type PhotosType = {
  large: string | null;
  small: string | null;
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
  followSuccess: (userId: number) => ({ type: "users/FOLLOW" as const, userId }),

  unfollowSuccess: (userId: number) => ({ type: "users/UNFOLLOW" as const, userId }),

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
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalUsersCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypeUser>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionsTypeUser,
) => {
  dispatch(usersActions.toggleIsFollowingProgress(true, userId));
  const response = await apiMethod(userId);

  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(usersActions.toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccess);
  };
};

// todo: why unfollow isn't used
export const unfollow = (userId: number): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersActions.unfollowSuccess);
  };
};
