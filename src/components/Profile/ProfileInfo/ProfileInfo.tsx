import React, { ChangeEvent, FC, useState } from "react";

import userPhoto from "../../../assets/img/user.png";

import s from "./ProfileInfo.module.css";

import { Preloader, ProfileType, ProfileStatusWithHooks, ProfileDataFormReduxForm } from "components";
import { ContactsType, savePhoto } from "../../../store";

type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
};

export const ProfileInfo: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  } else {
    const onSubmit = (formData: ProfileType) => {
      props.saveProfile(formData).then(() => {
        setEditMode(false);
      });
    };

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target?.files?.length) {
        savePhoto(e.target.files[0]);
      }
    };
    return (
      <div>
        {props.profile.photos.large && (
          <img
            src={props.profile.photos.large}
            alt="Horse"
            className="top-img"
            loading="lazy"
            width="1000"
            height="350"
          />
        )}
        <div className={s.description}>
          <img src={props.profile.photos.small || userPhoto} alt="Ava" />
          {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}

          {editMode ? (
            <ProfileDataFormReduxForm profile={props.profile} onSubmit={onSubmit} initialValues={props.profile} />
          ) : (
            <ProfileData
              goToEditMode={() => {
                setEditMode(true);
              }}
              isOwner={props.isOwner}
              profile={props.profile}
            />
          )}
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        </div>
      </div>
    );
  }
};

type ProfileDataProps = {
  isOwner: boolean;
  goToEditMode: () => void;
  profile: ProfileType;
};

const ProfileData: FC<ProfileDataProps> = (props) => {
  return (
    <>
      {props.isOwner && <button onClick={props.goToEditMode}>edit</button>}

      <div>
        <p>Full name: {props.profile.fullName}</p>

        <p>Looking for a job: {props.profile.lookingForAJob ? "yes" : "no"}</p>

        {props.profile.lookingForAJob && <p>My professional skills: {props.profile.lookingForAJobDescription}</p>}

        <p>About me: {props.profile.aboutMe}</p>

        <div>
          Contacts:
          {Object.keys(props.profile.contacts).map((key) => (
            <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]} />
          ))}
        </div>
      </div>
    </>
  );
};

type ContactProps = {
  contactTitle: string;
  contactValue: string;
};
export const Contact: FC<ContactProps> = (props) => {
  return (
    <div>
      {props.contactTitle}: {props.contactValue}
    </div>
  );
};
