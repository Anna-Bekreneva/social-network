import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../components/common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form action="#" onSubmit={props.handleSubmit}>
            <Field component={Input} validate={[required]} placeholder="login" name="login" type="text"/>
            <Field component={Input} validate={[required]} placeholder="password" name="password" type="text"/>
            <label>
                <Field component={Input} name="RememberMe" type="checkbox"/>
                Remember me
            </label>
            <button type="submit">Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export const Login = () => {
    const onSubmit = (formData: FormDataType) => console.log(formData)
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
