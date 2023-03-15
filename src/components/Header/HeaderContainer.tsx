import './Header.css';
import React from 'react';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {seAuthUserDataAC} from '../../redux/auth-reducer';

type MapStatePropsType = {
    login: string
    isAuth: boolean
}

type MapDispatchToPropsType = {
    seAuthUserDataAC: (userId: number, email: string, login: string) => void
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount () {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            if (response.data.resultCode === 0) {
                let {userId, login, email} = response.data.data
                this.props.seAuthUserDataAC(userId, login, email)
            }
        })
    }

    render () {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})

export type HeaderPropsType = MapStatePropsType & MapDispatchToPropsType

export default connect(mapStateToProps, {seAuthUserDataAC}) (HeaderContainer);