import { ProfileType } from "../../ProfileContainer";
import React, { FC } from "react";
import { Typography } from "antd";
import s from "../ProfileInfo.module.scss";
import { ContactsType } from "../../../../store";
import { Contact } from "../ProfileInfo";

type ProfileDataProps = {
  isOwner: boolean;
  goToEditMode: () => void;
  profile: ProfileType;
};

export const ProfileData: FC<ProfileDataProps> = ({ profile, goToEditMode, isOwner }) => {
  return (
    <div>
      <div>
        <Typography.Text className={s.name}>Full name: </Typography.Text>
        <Typography.Text>{profile.fullName}</Typography.Text>
      </div>

      <p>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</p>

      {profile.lookingForAJob && <p>My professional skills: {profile.lookingForAJobDescription}</p>}

      <p>About me: {profile.aboutMe}</p>

      <div>
        Contacts:
        {Object.keys(profile.contacts).map((key) => (
          <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
        ))}
      </div>
    </div>
  );
};
