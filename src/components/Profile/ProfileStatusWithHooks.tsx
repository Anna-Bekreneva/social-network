import React, { ChangeEvent, useEffect, useState } from "react";

type ProfileStatusPropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = ({ updateStatus, status }) => {
  const [editMode, setEditMode] = useState(false);
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
    <div>
      {!editMode && <span onDoubleClick={activeEditMode}>{status || "----"}</span>}
      {editMode && (
        <input type="text" value={currentStatus} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus />
      )}
    </div>
  );
};
