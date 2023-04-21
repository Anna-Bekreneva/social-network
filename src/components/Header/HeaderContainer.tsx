import './Header.css';
import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getAuthUserData} from '../../redux/auth-reducer';

type MapStatePropsType = {
    login: string
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount () {
        this.props.getAuthUserData()
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

export default connect(mapStateToProps, {getAuthUserData}) (HeaderContainer);
