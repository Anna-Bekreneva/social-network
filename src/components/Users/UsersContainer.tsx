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
  followSuccess,
  requestUsers,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  toggleIsFollowingProgress,
  unfollowSuccess,
  UserType,
  AppStateType,
} from "store";

class UsersContainer extends React.Component<UsersPropsType> {
  componentDidMount() {
    const { page, pageSize } = this.props;

    this.props.requestUsers(page, pageSize);
  }

  onPageChanged = (page: number) => {
    const { pageSize } = this.props;

    this.props.requestUsers(page, pageSize);
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
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
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
  };
};

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  page: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

type mapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (page: number) => void;
  setTotalUsersCount: (usersCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
  toggleIsFollowingProgress: (isFollowing: boolean, id: number) => void;
  requestUsers: (currentPage: number, pageSize: number) => void;
};

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType;

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    follow: followSuccess,
    unfollow: unfollowSuccess,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress,
    requestUsers,
  }),
)(UsersContainer);
