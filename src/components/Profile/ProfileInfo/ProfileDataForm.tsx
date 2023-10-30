import React from "react";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormControls.module.css";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

const ProfileDataForm = (props: InjectedFormProps<ProfileFormDataType>) => {
    return (
        <form action={"#"} onSubmit={props.handleSubmit}>
            <button type={'submit'}>save</button>
            {props.error && <span className={style.formSummaryError}>{props.error}</span>}
            <div>
                <p>Full name: {<Field component={Input} placeholder="Full name" name="fullName" type="text"/>}</p>

                <p>Looking for a job: {<Field component={Input} name="lookingForAJob" type="checkbox"/>}</p>

                <p>My professional skills: {<Field component={Textarea} placeholder="My professional skills" name="lookingForAJobDescription"/>}</p>

                <p>About me: {<Field component={Textarea} placeholder="About me" name="aboutMe"/>}</p>

                {/*<div>*/}
                {/*    Contacts: { Object.keys(props.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={props.contacts[key]}/>)}*/}
                {/*</div>*/}

            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType>({ form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm