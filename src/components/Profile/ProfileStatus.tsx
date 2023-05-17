import React, {ChangeEvent} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType>{
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode() {
        this.setState({editMode: true})
    }
    deactiveEditMode() {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    && <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || "----"}</span>}
                {this.state.editMode
                    && <input onChange={this.onStatusChange} type="text" value={this.state.status} onBlur={this.deactiveEditMode.bind(this)} autoFocus/>}
            </div>
        )
    }
}