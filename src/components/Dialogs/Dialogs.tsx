import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';
import {DialogsPropsType} from './DialogsContainer';

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
	const dialogElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
	const messagesElements = props.dialogsPage.messages.map(message => <Message message={message.message}></Message>);
	const newMessageBody = props.dialogsPage.newMessageBody;

	const onSendMessageClick = () => props.sendMessage();

	const onNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const text = event.currentTarget.value;
		props.updateMessageBody(text);
	};

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
	);
};
