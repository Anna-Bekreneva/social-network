import { BaseThunkType, InferActionsTypes } from "../store";

import { APIResponseType, ResultCode, usersAPI } from "api";
import { updateObjectInArray } from "utils";
import { Dispatch } from "redux";

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

const initialState = {
  users: [] as UserType[],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[],
  filter: { term: "", friend: null as null | boolean },
};

// todo: create specially name for everything InitialStateType
export type UsersInitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

export const users = (state = initialState, action: ActionsTypeUser): UsersInitialStateType => {
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
    case "users/SET-FILTER":
      return { ...state, filter: action.payload };
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

  setUsers: (users: Array<UserType>) => ({ type: "users/SET-USERS" as const, users }),

  setCurrentPage: (currentPage: number) => ({ type: "users/SET-CURRENT-PAGE" as const, currentPage }),

  setTotalUsersCount: (usersCount: number) => ({ type: "users/SET-TOTAL-USERS-COUNT" as const, usersCount }),

  setFilter: (filter: FilterType) => ({ type: "users/SET-FILTER" as const, payload: filter }),

  toggleIsFetching: (isFetching: boolean) => ({ type: "users/TOGGLE-IS-FETCHING" as const, isFetching }),

  toggleIsFollowingProgress: (isFollowing: boolean, userId: number) => ({
    type: "users/TOGGLE-IS-FOLLOWING-PROGRESS" as const,
    isFollowing,
    userId,
  }),
};

export const requestUsers = (page: number, pageSize: number, filter: FilterType): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true));
    dispatch(usersActions.setCurrentPage(page));
    dispatch(usersActions.setFilter(filter));

    // todo: give all filter
    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
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

  if (response.resultCode === ResultCode.Success) {
    dispatch(actionCreator(userId));
  }

  dispatch(usersActions.toggleIsFollowingProgress(false, userId));
};
export const follow = (userId: number): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccess);
  };
};

export const unfollow = (userId: number): BaseThunkType<ActionsTypeUser> => {
  return async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersActions.unfollowSuccess);
  };
};
