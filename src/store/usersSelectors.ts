import { AppStateType, UserType } from "store";

export const getUsers = (state: AppStateType): Array<UserType> => state.users.users;
export const getPageSize = (state: AppStateType): number => state.users.pageSize;
export const getTotalUsersCount = (state: AppStateType): number => state.users.totalUsersCount;
export const getCurrentPage = (state: AppStateType): number => state.users.currentPage;
export const getIsFetching = (state: AppStateType): boolean => state.users.isFetching;
export const getFollowingInProgress = (state: AppStateType): Array<number> => state.users.followingInProgress;
