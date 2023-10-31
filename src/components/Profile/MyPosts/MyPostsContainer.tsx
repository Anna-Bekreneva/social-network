import React from 'react'

import './MyPosts.css'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addPostActionCreator, ProfilePageType } from 'store/profile-reducer'
import { AppStateType } from 'store/redux-store'

import MyPosts from './MyPosts'

type MapStatePropsType = {
  profilePage: ProfilePageType
}

type MapDispatchToProps = {
  addPost: (newPostText: string) => void
}

export type ProfilePropsType = MapStatePropsType & MapDispatchToProps

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profilePage: state.profile,
})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
  return {
    addPost: (newPostText: string) => dispatch(addPostActionCreator(newPostText)),
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
