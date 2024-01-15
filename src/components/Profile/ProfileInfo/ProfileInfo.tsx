import React, { ChangeEvent, FC, useState } from "react";

import userPhoto from "../../../assets/img/user.png";

import s from "./ProfileInfo.module.scss";

import { Preloader, ProfileType, ProfileStatusWithHooks, ProfileDataFormReduxForm } from "components";
import { ContactsType, savePhoto } from "../../../store";
import { Button, Dropdown, Flex, Image, MenuProps, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PictureOutlined } from "@ant-design/icons";
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
  const [editMode, setEditMode] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  if (!profile) {
    return <Preloader />;
  } else {
    const onSubmit = (formData: ProfileType) => {
      saveProfile(formData).then(() => {
        setEditMode(false);
      });
    };

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target?.files?.length) {
        savePhoto(e.target.files[0]);
      }
    };

    const itemsDropdown: MenuProps["items"] = [
      { key: "change", label: "Change cover", icon: <PictureOutlined className={s.dropdownIcon} rev={""} /> },
      { key: "delete", label: "Delete cover", icon: <DeleteOutlined className={s.dropdownIcon} rev={""} /> },
    ];

    return (
      <div>
        {profile.photos.large && (
          <div className={s.cover}>
            <Dropdown
              className={s.dropdown}
              open={isOpenDropdown}
              onOpenChange={() => setIsOpenDropdown(!isOpenDropdown)}
              trigger={["click"]}
              menu={{ items: itemsDropdown }}
              placement={"bottomRight"}>
              {/* todo: show button on hover */}
              <button className={s.trigger}>
                <EditOutlined className={s.dropdownIcon} rev={""} />
                <Typography.Text> Edit cover </Typography.Text>
              </button>
            </Dropdown>
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
          <Image
            className={s.ava}
            src={profile.photos.small || userPhoto}
            width={120}
            height={120}
            alt="avatar"
            placeholder={false}
            preview={false}
          />
          <div>
            <Typography.Title className={s.title}> {profile.fullName} </Typography.Title>
            <Typography.Paragraph> {profile.aboutMe} </Typography.Paragraph>
            {editMode ? (
              <ProfileDataFormReduxForm profile={profile} onSubmit={onSubmit} initialValues={profile} />
            ) : (
              <ProfileData goToEditMode={() => setEditMode(true)} isOwner={isOwner} profile={profile} />
            )}
          </div>
          <Button className={s.buttonEdit} htmlType="button" onClick={() => setEditMode(true)}>
            <EditOutlined className={s.iconEdit} rev={""} />
            <Typography.Text> Edit profile </Typography.Text>
          </Button>
        </Flex>
        <div className={s.description}>
          {/*{isOwner && <input type="file" onChange={onMainPhotoSelected} />}*/}
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
      </div>
    );
  }
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
