import React from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {dialogElements, StoreType} from '../../redux/state';


export const Dialogs: React.FC<StoreType> = (props) => {
	let messagesElements = props._state.dialogsPage.dialogs.map( message => <Message message={message.name}></Message> )
	return (
		<div className={s.dialogs}>
			<ul className={s.dialogs_items}>
				{dialogElements}
			</ul>
			<div className={s.messages}>
				{messagesElements}
			</div>
		</div>
	)
}