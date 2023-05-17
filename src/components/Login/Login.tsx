import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form action="#" onSubmit={props.handleSubmit}>
            <Field placeholder="login" component="input" name="login" type="text"/>
            <Field placeholder="password" component="input" name="password" type="text"/>
            <label>
                <Field component="input" name="RememberMe" type="checkbox"/>
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
