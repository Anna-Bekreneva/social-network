import React from 'react';
import './MyPosts.css';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {addPostActionCreator, ProfilePageType, updatePostTextActionCreator} from '../../../redux/profile-reducer';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapStatePropsType = {
	profilePage: ProfilePageType
}

type MapDispatchToProps = {
	addPost: (text: string) => void
	updateNewPostText: (text: string) => void
}

export type ProfilePropsType = MapStatePropsType & MapDispatchToProps

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({profilePage: state.profile})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
	return {
		addPost: (text: string) => dispatch(addPostActionCreator(text)),
		updateNewPostText: (text: string) => dispatch(updatePostTextActionCreator(text))
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;