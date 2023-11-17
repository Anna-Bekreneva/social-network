import { connect } from "react-redux";
import { Dispatch } from "redux";

import { MyPosts } from "./MyPosts";

import { ProfilePageType, AppStateType, profileActions } from "store";

type MapStatePropsType = {
  profilePage: ProfilePageType;
};

type MapDispatchToProps = {
  addPost: (newPostText: string) => void;
};

export type ProfilePropsType = MapStatePropsType & MapDispatchToProps;

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profilePage: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
  return {
    addPost: (newPostText: string) => dispatch(profileActions.addPost(newPostText)),
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
