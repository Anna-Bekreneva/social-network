import React from "react";

import { MyPostsContainer, ProfileInfo, ProfileType } from "components";

type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
};

export const Profile: React.FC<PropsType> = ({ saveProfile, savePhoto, profile, updateStatus, status, isOwner }) => {
  return (
    <>
      <h1 className={"sr-only"}> Profile of {profile?.fullName} </h1>
      <ProfileInfo
        saveProfile={saveProfile}
        savePhoto={savePhoto}
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
      />
      {/*<MyPostsContainer />*/}
    </>
  );
};
