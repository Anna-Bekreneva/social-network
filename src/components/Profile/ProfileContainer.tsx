import React from 'react';
import './Profile.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {ContactsType, getUserProfile, PhotosType, ProfileType} from '../../redux/profile-reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

export type ProfilePropsType = MapStatePropsType & mapDispatchToPropsType

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

export type MapStatePropsType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
}

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount () {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfile(this.props.userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"}></Redirect>
        return <Profile userId={this.props.userId} photos={this.props.photos} contacts={this.props.contacts} fullName={this.props.fullName} lookingForAJob={this.props.lookingForAJob} lookingForAJobDescription={this.props.lookingForAJobDescription} aboutMe={this.props.aboutMe}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userId: state.profile.profile.userId,
        photos: state.profile.profile.photos,
        lookingForAJob: state.profile.profile.lookingForAJob,
        contacts: state.profile.profile.contacts,
        fullName: state.profile.profile.fullName,
        lookingForAJobDescription: state.profile.profile.lookingForAJobDescription,
        aboutMe: state.profile.profile.aboutMe,
        isAuth: state.auth.isAuth
    }
}

const withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfile}) (withUrlDataContainerComponent);
