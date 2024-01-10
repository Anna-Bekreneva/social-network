import React from "react";

import { connect } from "react-redux";
import { compose } from "redux";

import { Users } from "./Users";

import { Preloader } from "components";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  requestUsers,
  UserType,
  AppStateType,
  usersActions,
  FilterType,
  getUsersFilter,
  follow,
  unfollow,
} from "store";

class UsersContainer extends React.Component<UsersPropsType> {
  componentDidMount() {
    // todo: page rename to currentPage
    const { page, pageSize, filter } = this.props;

    this.props.requestUsers(page, pageSize, filter);
  }

  onPageChanged = (page: number) => {
    const { pageSize, filter } = this.props;

    // todo: requestUsers rename to getUsers
    this.props.requestUsers(page, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.requestUsers(pageSize, 1, filter);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.page}
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    page: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  page: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type mapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
};

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType;

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    follow: follow,
    unfollow: unfollow,
    requestUsers,
  }),
)(UsersContainer);
