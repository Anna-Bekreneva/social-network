import React from 'react';
import './MyPosts.css';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {addPostActionCreator, ProfilePageType} from '../../../redux/profile-reducer';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapStatePropsType = {
	profilePage: ProfilePageType
}

type MapDispatchToProps = {
	addPost: (newPostText: string) => void
}

export type ProfilePropsType = MapStatePropsType & MapDispatchToProps

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({profilePage: state.profile})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
	return {
		addPost: (newPostText: string) => dispatch(addPostActionCreator(newPostText)),
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;