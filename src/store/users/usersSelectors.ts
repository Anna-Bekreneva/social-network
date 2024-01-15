import { AppStateType, FilterType, UserType } from "store";

export const selectUsers = (state: AppStateType): Array<UserType> => state.users.users;
export const selectPageSize = (state: AppStateType): number => state.users.pageSize;
export const selectTotalUsersCount = (state: AppStateType): number => state.users.totalUsersCount;
export const selectCurrentPage = (state: AppStateType): number => state.users.currentPage;
export const selectIsFetching = (state: AppStateType): boolean => state.users.isFetching;
export const selectFollowingInProgress = (state: AppStateType): Array<number> => state.users.followingInProgress;
export const selectUsersFilter = (state: AppStateType): FilterType => state.users.filter;
