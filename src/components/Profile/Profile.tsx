import React from "react";

import { MyPostsContainer, ProfileInfo, ProfileType } from "components";
import { Redirect } from "react-router-dom";

type PropsType = {
  status: string;
  isAuth: boolean;
  isOwner: boolean;
  profile: ProfileType | null;
  savePhoto: (file: File) => void;
  updateStatus: (status: string) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
};

export const Profile: React.FC<PropsType> = ({
  isAuth,
  saveProfile,
  savePhoto,
  profile,
  updateStatus,
  status,
  isOwner,
}) => {
  if (!isAuth) {
    return <Redirect to={"/login"} />;
  }
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
