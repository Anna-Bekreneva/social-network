import React from 'react'

import { Redirect } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import s from './Dialogs.module.css'

import { DialogItem, Textarea, DialogsPropsType, Message } from 'components'
import { maxLengthCreator, required } from 'utils'

const maxLength100 = maxLengthCreator(100)

export const Dialogs: React.FC<DialogsPropsType> = props => {
  const dialogElements = props.dialogsPage.dialogs.map(dialog => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ))
  const messagesElements = props.dialogsPage.messages.map(message => (
    <Message message={message.message} key={message.id}></Message>
  ))

  const addNewMessage = (values: FormDataType) => {
    props.sendMessage(values.newMessageBody)
  }

  if (!props.isAuth) return <Redirect to={'/login'} />

  return (
    <div className={s.dialogs}>
      <ul className={s.dialogs_items}>{dialogElements}</ul>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  )
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        validate={[required, maxLength100]}
        name={'newMessageBody'}
        placeholder={'Enter your message'}
      ></Field>
      <button>Send</button>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<FormDataType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm)

type FormDataType = {
  newMessageBody: string
}
