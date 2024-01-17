import React, { ChangeEvent, useRef, useState } from "react";

import userPhoto from "../../../assets/img/user.png";

import s from "./ProfileInfo.module.scss";

import { Preloader, ProfileDataFormReduxForm, ProfileType } from "components";
import { Button, Flex, Image, Typography } from "antd";
import { CloudUploadOutlined, EditOutlined } from "@ant-design/icons";
import { ProfileData } from "./ProfileData";

type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
};

export const ProfileInfo: React.FC<PropsType> = ({
  saveProfile,
  profile,
  savePhoto,
  updateStatus,
  status,
  isOwner,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  if (!profile) {
    return <Preloader />;
  } else {
    const onSubmit = (formData: ProfileType) => {
      saveProfile(formData).then(() => {
        setIsEditMode(false);
      });
    };

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target?.files?.length) {
        savePhoto(e.target.files[0]);
      }
    };

    return (
      <div className={s.profile}>
        <h2 className={"sr-only"}>About profile</h2>
        <input ref={inputFileRef} style={{ display: "none" }} type="file" onChange={onMainPhotoSelected} />
        {profile.photos.large && (
          <div className={s.cover}>
            <Image
              src={profile.photos.large}
              height={320}
              width={"100%"}
              placeholder={false}
              loading={"lazy"}
              className={s.topImg}
              preview={false}
              alt={"cover"}
            />
          </div>
        )}
        <Flex className={s.topContent} gap={20}>
          <Flex className={s.ava} gap={12} vertical>
            <Image
              src={profile.photos.small || userPhoto}
              width={120}
              height={120}
              alt="avatar"
              placeholder={false}
              preview={false}
            />
            <Button type={"default"} onClick={() => inputFileRef.current?.click()}>
              <CloudUploadOutlined className={s.icon} rev={""} />
              Upload
            </Button>
          </Flex>
          <div className={s.settings}>
            {isEditMode ? (
              <ProfileDataFormReduxForm profile={profile} onSubmit={onSubmit} initialValues={profile} />
            ) : (
              <ProfileData profile={profile} isOwner={true} status={status} updateStatus={updateStatus} />
            )}
          </div>
          <Button className={s.buttonEdit} htmlType="button" onClick={() => setIsEditMode(!isEditMode)}>
            <EditOutlined className={s.icon} rev={""} />
            <Typography.Text> Edit profile </Typography.Text>
          </Button>
        </Flex>
      </div>
    );
  }
};
