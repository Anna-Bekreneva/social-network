import React, {FC, useState} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfilePagePropsType, ProfileType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "components/Profile/ProfileStatusWithHooks";
import userPhoto from '../../../assets/img/user.png';
import ProfileDataForm, {ProfileFormDataType} from "./ProfileDataForm";

export const ProfileInfo = (props: ProfilePagePropsType) => {
	const [editMode, setEditMode] = useState(false)

	if (!props) {
		return <Preloader></Preloader>;
	} else {
		const onSubmit = (formData: ProfileFormDataType) => {
			props.saveProfile(formData).then(() => {
				setEditMode(false)
			})
		}
		return (
			<div>
            	<img src="https://www.treehugger.com/thmb/SShPLoEHvhEViNtPvs82-QcCPrQ=/2121x1193/smart/filters:no_upscale()/horse.primary-e9a47e1c486c4fb7bf729e05b59cf0df.jpg" alt="Horse" className="top-img" loading="lazy" width="1000" height="350"/>
            	<div className={s.description}>
					<img src={props.photos.small || userPhoto} alt="Ava"/>

					{ editMode
						? <ProfileDataForm onSubmit={onSubmit}/>
						: <ProfileData goToEditMode={() => {setEditMode(true)}} isOwner={props.isOwner} aboutMe={props.aboutMe} contacts={props.contacts} fullName={props.fullName} lookingForAJob={props.lookingForAJob} lookingForAJobDescription={props.lookingForAJobDescription}/>
					}
					<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            	</div>
        	</div>
		)
	}
};

type ProfileDataProps = ProfileType & {
	isOwner: boolean
	goToEditMode: () => void
}

const ProfileData: FC<ProfileDataProps> = (props) => {
	return (
		<>
			{ props.isOwner && <button onClick={props.goToEditMode} >edit</button> }

			<div>
				<p>Full name: {props.fullName}</p>

				<p>Looking for a job: { props.lookingForAJob ? "yes" : "no"}</p>

				{ props.lookingForAJob &&  <p>My professional skills: { props.lookingForAJobDescription}</p>}

				<p>About me: { props.aboutMe}</p>

				<div>
					Contacts: { Object.keys(props.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={props.contacts[key]}/>)}
				</div>

			</div>
		</>
	)
}

type ContactProps = {
	contactTitle: string
	contactValue: string
}
export const Contact: FC<ContactProps> = (props) => {
	return <div> {props.contactTitle}: {props.contactValue} </div>
}