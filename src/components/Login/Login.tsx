import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "components/common/FormsControls/FormsControls";
import {required} from "utils/validators/validators";
import {connect} from "react-redux";
import {login} from "redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "redux/redux-store";
import style from './../common/FormsControls/FormControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form action="#" onSubmit={handleSubmit}>
            <Field component={Input} validate={[required]} placeholder="Email" name="email" type="text"/>
            <Field component={Input} validate={[required]} placeholder="Password" name="password" type="text"/>
            <label>
                <Field component={Input} name="RememberMe" type="checkbox"/>
                Remember me
            </label>
            {error && <span className={style.formSummaryError}>{error}</span>}
            <button type="submit">Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to={'/profile'}/>

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type mapStateToPropsType = {
    isAuth: boolean
}

type LoginPropsType = mapStateToPropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login)
