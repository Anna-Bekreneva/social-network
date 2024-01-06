import React, { FC, useState } from "react";

import userPhoto from "../../../assets/img/user.png";

import s from "./ProfileInfo.module.css";

import { Preloader, ProfileType, ProfileStatusWithHooks, ProfileDataFormReduxForm } from "components";
import { ContactsType } from "../../../store";

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
    return <Preloader></Preloader>;
  } else {
    const onSubmit = (formData: ProfileType) => {
      props.saveProfile(formData).then(() => {
        setEditMode(false);
      });
    };

    return (
      <div>
        <img
          src="https://www.treehugger.com/thmb/SShPLoEHvhEViNtPvs82-QcCPrQ=/2121x1193/smart/filters:no_upscale()/horse.primary-e9a47e1c486c4fb7bf729e05b59cf0df.jpg"
          alt="Horse"
          className="top-img"
          loading="lazy"
          width="1000"
          height="350"
        />
        <div className={s.description}>
          <img src={props.profile.photos.small || userPhoto} alt="Ava" />

          {editMode ? (
            <ProfileDataFormReduxForm profile={props.profile} onSubmit={onSubmit} initialValues={props.profile} />
          ) : (
            <ProfileData
              goToEditMode={() => {
                setEditMode(true);
              }}
              isOwner={props.isOwner}
              aboutMe={props.profile.aboutMe}
              contacts={props.profile.contacts}
              fullName={props.profile.fullName}
              lookingForAJob={props.profile.lookingForAJob}
              lookingForAJobDescription={props.profile.lookingForAJobDescription}
            />
          )}
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        </div>
      </div>
    );
  }
};

type ProfileDataProps = Omit<ProfileType, "photos"> & {
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData: FC<ProfileDataProps> = (props) => {
  return (
    <>
      {props.isOwner && <button onClick={props.goToEditMode}>edit</button>}

      <div>
        <p>Full name: {props.fullName}</p>

        <p>Looking for a job: {props.lookingForAJob ? "yes" : "no"}</p>

        {props.lookingForAJob && <p>My professional skills: {props.lookingForAJobDescription}</p>}

        <p>About me: {props.aboutMe}</p>

        <div>
          Contacts:
          {Object.keys(props.contacts).map((key) => (
            <Contact key={key} contactTitle={key} contactValue={props.contacts[key as keyof ContactsType]} />
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
