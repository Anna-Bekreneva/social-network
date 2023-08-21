import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfilePagePropsType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "components/Profile/ProfileStatusWithHooks";

export const ProfileInfo = (props: ProfilePagePropsType) => {
	if (!props) {
		return <Preloader></Preloader>;
	} else {
		return (
			<div>
            	<img src="https://www.treehugger.com/thmb/SShPLoEHvhEViNtPvs82-QcCPrQ=/2121x1193/smart/filters:no_upscale()/horse.primary-e9a47e1c486c4fb7bf729e05b59cf0df.jpg" alt="Horse" className="top-img" loading="lazy" width="1000" height="350"/>
            	<div className={s.description}>
					<img src={props.photos.small} alt="Ava"/>
					<p>{props.fullName}</p>
					{/*<ProfileStatus status={props.status} updateStatus={props.updateStatus}/>*/}
					<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            	</div>
        	</div>
		)
	}
};