import React from 'react';
import './Profile.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {ContactsType, getStatus, getUserProfile, PhotosType, updateStatus} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from "redux";

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
    status: string
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

export type ProfilePagePropsType = mapDispatchToPropsType & MapStatePropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount () {
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId = 26977
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return <Profile userId={this.props.userId} photos={this.props.photos} contacts={this.props.contacts} fullName={this.props.fullName} lookingForAJob={this.props.lookingForAJob} lookingForAJobDescription={this.props.lookingForAJobDescription} aboutMe={this.props.aboutMe} status={this.props.status} getStatus={this.props.getStatus} getUserProfile={this.props.getUserProfile} updateStatus={this.props.updateStatus}/>
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
        status: state.profile.profile.status
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer)
