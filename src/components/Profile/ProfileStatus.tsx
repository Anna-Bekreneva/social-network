import React from "react";

type ProfileStatusPropsType = {
    status: string
}
export class ProfileStatus extends React.Component<ProfileStatusPropsType>{
    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({editMode: true})
    }
    deactiveEditMode() {
        this.setState({editMode: false})
    }
    render() {
        return (
            <div>
                {!this.state.editMode && <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>}
                {this.state.editMode && <input type="text" value={this.props.status} onBlur={this.deactiveEditMode.bind(this)} autoFocus/>}
            </div>
        )
    }
}