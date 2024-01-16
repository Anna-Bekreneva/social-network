import { ProfileType } from "../../ProfileContainer";
import React, { FC } from "react";
import { Flex, Typography } from "antd";
import { ContactsType } from "../../../../store";
import { SearchOutlined } from "@ant-design/icons";
import s from "./ProfileData.module.scss";
import { Social } from "../../../common";
import { hasCorrectProperty } from "../../../../utils";

type ProfileDataProps = {
  isOwner: boolean;
  profile: ProfileType;
};

export const ProfileData: FC<ProfileDataProps> = ({ profile, isOwner }) => {
  return (
    <>
      <div className={s.item}>
        <Typography.Title level={3}>{profile.fullName} </Typography.Title>
        <Typography.Paragraph className={s.descr}> {profile.aboutMe} </Typography.Paragraph>
      </div>
      <div className={s.item}>
        {profile.lookingForAJob && (
          <Flex gap={"small"} vertical>
            <Typography.Text className={s.jobTitle}>
              <SearchOutlined rev={""} /> I'm looking for a job
            </Typography.Text>
            <Typography.Paragraph className={s.descr}>{profile.lookingForAJobDescription}</Typography.Paragraph>
          </Flex>
        )}
      </div>
      {hasCorrectProperty(profile.contacts) && (
        <div>
          <Typography.Title level={3}>Contacts</Typography.Title>
          <ul className={s.socials}>
            {Object.keys(profile.contacts).map((key) => (
              <Social key={key} title={key} value={profile.contacts[key as keyof ContactsType]} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
