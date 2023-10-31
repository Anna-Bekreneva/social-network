import React, { ChangeEvent, useEffect, useState } from 'react'

type ProfileStatusPropsType = {
  status: string
  updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activeEditMode = () => setEditMode(true)
  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) =>
    setStatus(event.currentTarget.value)

  return (
    <div>
      {!editMode && <span onDoubleClick={activeEditMode}>{props.status || '----'}</span>}
      {editMode && (
        <input
          type="text"
          value={status}
          onChange={onStatusChange}
          onBlur={deactivateEditMode}
          autoFocus
        />
      )}
    </div>
  )
}
