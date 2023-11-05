import React from "react";

import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";

import { Profile } from "components";
import {
  ContactsType,
  getStatus,
  getUserProfile,
  PhotosType,
  savePhoto,
  saveProfile,
  updateStatus,
  AppStateType,
} from "store";

type ProfilePropsType = MapStatePropsType & mapDispatchToPropsType;

type PathParamsType = {
  userId: string;
};

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType;

export type MapStatePropsType = ProfileType & {
  userId: number | null;
  photos: PhotosType;
  status: string;
  isAuth: boolean;
};

export type ProfileType = {
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
};

type mapDispatchToPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: any) => any;
};

export type ProfilePagePropsType = mapDispatchToPropsType &
  MapStatePropsType & {
    isOwner: boolean;
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
    userId && this.props.getUserProfile(userId);
    userId && this.props.getStatus(userId);
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
        userId={this.props.userId}
        photos={this.props.photos}
        contacts={this.props.contacts}
        fullName={this.props.fullName}
        lookingForAJob={this.props.lookingForAJob}
        lookingForAJobDescription={this.props.lookingForAJobDescription}
        aboutMe={this.props.aboutMe}
        status={this.props.status}
        getStatus={this.props.getStatus}
        getUserProfile={this.props.getUserProfile}
        updateStatus={this.props.updateStatus}
        isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    userId: state.auth.userId,
    photos: state.profile.profile.photos,
    lookingForAJob: state.profile.profile.lookingForAJob,
    contacts: state.profile.profile.contacts,
    fullName: state.profile.profile.fullName,
    lookingForAJobDescription: state.profile.profile.lookingForAJobDescription,
    aboutMe: state.profile.profile.aboutMe,
    status: state.profile.profile.status,
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
