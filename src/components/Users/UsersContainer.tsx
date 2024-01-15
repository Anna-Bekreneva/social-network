import React from "react";

import { connect } from "react-redux";
import { compose } from "redux";

import { Users } from "./Users";

import { Preloader } from "components";
import {
  selectCurrentPage,
  selectFollowingInProgress,
  selectIsFetching,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
  requestUsers,
  UserType,
  AppStateType,
  FilterType,
  selectUsersFilter,
  follow,
  unfollow,
} from "store";

class UsersContainer extends React.Component<UsersPropsType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;

    this.props.getUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (currentPage: number) => {
    const { pageSize, filter } = this.props;
    this.props.getUsers(currentPage, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const { pageSize, currentPage } = this.props;
    this.props.getUsers(currentPage, pageSize, filter);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: selectUsers(state),
    pageSize: selectPageSize(state),
    totalUsersCount: selectTotalUsersCount(state),
    currentPage: selectCurrentPage(state),
    isFetching: selectIsFetching(state),
    followingInProgress: selectFollowingInProgress(state),
    filter: selectUsersFilter(state),
  };
};

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type mapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
};

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType;

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    follow: follow,
    unfollow: unfollow,
    getUsers: requestUsers,
  }),
)(UsersContainer);
