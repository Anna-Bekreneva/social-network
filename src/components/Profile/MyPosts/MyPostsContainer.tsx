import { connect } from "react-redux";

import { MyPosts } from "./MyPosts";

import { AppStateType, profileActions, PostType } from "store";

type MapStatePropsType = {
  posts: Array<PostType>;
};

type MapDispatchToProps = {
  addPost: (newPostText: string) => void;
};

export type ProfilePropsType = MapStatePropsType & MapDispatchToProps;

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  posts: state.profile.posts,
});

export const MyPostsContainer = connect<MapStatePropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {
  addPost: profileActions.addPost,
})(MyPosts);
