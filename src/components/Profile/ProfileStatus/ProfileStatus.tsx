import Typography from "antd/es/typography";
import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./ProfileStatus.module.scss";
import { Input as InputAntd } from "antd";

type ProfileStatusPropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

export const ProfileStatus: React.FC<ProfileStatusPropsType> = ({ updateStatus, status }) => {
  const [editMode, setEditMode] = useState(true);
  const [currentStatus, setCurrentStatusStatus] = useState(status);

  useEffect(() => {
    setCurrentStatusStatus(status);
  }, [status]);

  const activeEditMode = () => setEditMode(true);
  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(currentStatus);
  };
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => setCurrentStatusStatus(event.currentTarget.value);
  return (
    <div className={s.status}>
      <Typography.Text className={s.name}> Status: </Typography.Text>
      {!editMode && <Typography.Text onDoubleClick={activeEditMode}>{status || "No status"}</Typography.Text>}
      {editMode && (
        <div className={s.input}>
          <InputAntd
            type="text"
            value={currentStatus}
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};
