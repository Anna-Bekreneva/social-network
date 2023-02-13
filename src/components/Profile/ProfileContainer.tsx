import React from 'react';
import './Profile.css';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {ProfileType, setUserProfile} from '../../redux/profile-reducer';
import {RouteComponentProps} from 'react-router-dom';

export type ProfilePropsType = MapStatePropsType & mapDispatchToPropsType

// type PathParamsType = {
//     userId: string
// }
//
// type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

export type MapStatePropsType = ProfileType

type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount () {
        // let userId = props.match.params.useId
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setUserProfile(response.data)
            console.log(response.data)
        })
    }

    render() {
        return <Profile userId={this.props.userId} photos={this.props.photos} contacts={this.props.contacts} fullName={this.props.fullName} lookingForAJob={this.props.lookingForAJob} lookingForAJobDescription={this.props.lookingForAJobDescription}/>
    }
}
// profile: state.profile.profile
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userId: state.profile.profile.userId,
        photos: state.profile.profile.photos,
        lookingForAJob: state.profile.profile.lookingForAJob,
        contacts: state.profile.profile.contacts,
        fullName: state.profile.profile.fullName,
        lookingForAJobDescription: state.profile.profile.lookingForAJobDescription
    }
}

export default connect(mapStateToProps, {setUserProfile}) (ProfileContainer);