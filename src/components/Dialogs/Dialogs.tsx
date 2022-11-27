import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';
import {StoreType} from '../../redux/state';
import {sendMessageActionCreator, updateMessageBodyActionCreator} from '../../redux/dialogs-reducer';


export const Dialogs: React.FC<StoreType> = (props) => {
	const dialogElements = props._state.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
	const messagesElements = props._state.dialogsPage.messages.map( message => <Message message={message.message}></Message> )
	const newMessageBody = props._state.dialogsPage.newMessageBody

	const onSendMessageClick = () => {
		props.dispatch(sendMessageActionCreator())
	}

	const onNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		props.dispatch(updateMessageBodyActionCreator(event.currentTarget.value))
	}

	return (
		<div className={s.dialogs}>
			<ul className={s.dialogs_items}>
				{dialogElements}
			</ul>
			<div className={s.messages}>
				<div>{messagesElements}</div>
				<div>
					<textarea value={newMessageBody} onChange={onNewMessageChange} placeholder={'Enter your message'}></textarea>
					<button onClick={onSendMessageClick}>Send</button>
				</div>
			</div>
		</div>
	)
}