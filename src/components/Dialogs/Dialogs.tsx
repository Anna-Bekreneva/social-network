import React from "react";
import s from "./Dialogs.module.css";
import { AddMessageFormDataType, AddMessageFormRedux, DialogItem, DialogsPropsType, Message } from "components";

export const Dialogs: React.FC<DialogsPropsType> = ({ dialogsPage, sendMessage }) => {
  const dialogElements = dialogsPage.dialogs.map((dialog) => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ));
  const messagesElements = dialogsPage.messages.map((message) => (
    <Message message={message.message} key={message.id}></Message>
  ));

  const addNewMessage = (values: AddMessageFormDataType) => {
    sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <ul className={s.dialogs_items}>{dialogElements}</ul>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
};
