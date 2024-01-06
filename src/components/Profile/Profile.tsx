import React, { ChangeEvent } from "react";

import "./Profile.css";
import { MyPostsContainer, ProfileInfo, ProfileType } from "components";

type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
};

export const Profile: React.FC<PropsType> = (props) => {
  const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      props.savePhoto(event.target.files[0]);
    }
  };

  return (
    <>
      <ProfileInfo
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      {props.isOwner && <input onChange={onMainPhotoSelected} type={"file"} />}
      <MyPostsContainer />
    </>
  );
};
