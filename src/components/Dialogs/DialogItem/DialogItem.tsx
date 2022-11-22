import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemType = {
	id: number
	name: string
}

export const DialogItem: React.FC<DialogItemType> = (props) => {
	return (
		<li className={s.dialogs_item + ' ' + s.dialogs_item_active}>
			<NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
		</li>
	)
}