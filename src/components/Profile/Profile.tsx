import React, { ChangeEvent } from 'react'

import './Profile.css'
import { ProfilePagePropsType, MyPostsContainer, ProfileInfo } from 'components'

export const Profile = (props: ProfilePagePropsType) => {
  const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      props.savePhoto(event.target.files[0])
    }
  }

  return (
    <>
      <ProfileInfo
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        photos={props.photos}
        contacts={props.contacts}
        fullName={props.fullName}
        lookingForAJob={props.lookingForAJob}
        lookingForAJobDescription={props.lookingForAJobDescription}
        userId={props.userId}
        aboutMe={props.aboutMe}
        status={props.status}
        getStatus={props.getStatus}
        getUserProfile={props.getUserProfile}
        updateStatus={props.updateStatus}
        isAuth={props.isAuth}
      />
      {props.isOwner && <input onChange={onMainPhotoSelected} type={'file'} />}
      <MyPostsContainer />
    </>
  )
}
