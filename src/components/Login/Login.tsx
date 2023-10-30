import React from 'react';
import {Field, reduxForm} from "redux-form";
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
    captchaUrl: null | string
}

const LoginForm: React.FC<any> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form action="#" onSubmit={handleSubmit}>
            <Field component={Input} validate={[required]} placeholder="Email" name="email" type="text"/>
            <Field component={Input} validate={[required]} placeholder="Password" name="password" type="text"/>
            <label>
                <Field component={Input} name="RememberMe" type="checkbox"/>
                Remember me
            </label>

            { captchaUrl && <img src={captchaUrl} alt="captcha"/> }
            { captchaUrl && <Field component={Input} validate={[required]} name="captcha" type="text"/>}

            {error && <span className={style.formSummaryError}>{error}</span>}
            <button type="submit">Login</button>
        </form>
    )
}

const LoginReduxForm: any = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        console.log
        (formData)
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }

    if (props.isAuth) return <Redirect to={'/profile'}/>

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => void
}

type mapStateToPropsType = {
    captchaUrl: null | string
    isAuth: boolean
}

type LoginPropsType = mapStateToPropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login)
