import React from "react";

import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";

import { Profile } from "components";
import { ContactsType, getStatus, getUserProfile, savePhoto, saveProfile, updateStatus, AppStateType } from "store";

type ProfilePropsType = MapStatePropsType & mapDispatchToPropsType;

type PathParamsType = {
  userId: string;
};

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType;

export type MapStatePropsType = {
  userId: number | null;
  profile: ProfileType | null;
  status: string;
  isAuth: boolean;
};

export type ProfileType = {
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: {
    large: string;
    small: string;
  };
};

type mapDispatchToPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
};

class ProfileInner extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = Number(this.props.match.params.userId);

    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    if (!userId) {
      console.error("ID should exists in URI params or in state ('authorizedUserId')");
    } else {
      //userId && this.props.getUserProfile(userId);
      this.props.getUserProfile(userId);
      //userId && this.props.getStatus(userId);
      this.props.getStatus(userId);
    }
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>) {
    if (this.props.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        saveProfile={this.props.saveProfile}
        savePhoto={this.props.savePhoto}
        isOwner={!this.props.match.params.userId}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        profile={this.props.profile}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    profile: state.profile.profile,
    status: state.profile.profile.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
)(ProfileInner);
