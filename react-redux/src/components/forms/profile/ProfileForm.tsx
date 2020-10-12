import * as React from "react";
import { connect } from 'react-redux'

import {ProfileFormView} from "./ProfileFormView"
import {AuthenticatedApplication} from "../../../AuthenticatedApplication"
import {EditProfileRequestModel} from "../../../services/types"
import {withAuthenticatedApplicationContext} from "../../../services/context/WithAuthenticatedApplicationContext"
import { Profile } from "../../../services/Profile"
import {RootState, RootThunkDispatch} from './../../../store'
import {UserProfileErrorMessageModel} from './../../../store/interfaces'
import {setProfileFormSnackbarOpen, editProfile} from './../../../store/userProfile/actions'

interface OwnProps {
    application: AuthenticatedApplication
}

interface StateProps {
    inProgress: boolean,
    snackBarOpen: boolean,
    errorMessages: UserProfileErrorMessageModel,
    profile: Profile
}

interface DispatchProps {
    editProfile: (request: EditProfileRequestModel) => void,
    closeSnackBar: () => void
}

interface State {
    name: string,
    mpbx_token: string
}

type Props = OwnProps & StateProps & DispatchProps

class ProfileForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            mpbx_token: props.profile.mpbx_token ? props.profile.mpbx_token : '',
            name: ''
        }
    }

    private readonly onSave = () => this.props.editProfile(this.createEditProfileRequestModel())

    private readonly createEditProfileRequestModel = () : EditProfileRequestModel => {
        return {
            name: this.state.name,
            mpbx_token: this.state.mpbx_token
        }
    }

    private readonly handleSnackBarClose = (_?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.closeSnackBar()
    };

    private readonly handleNameFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value})
    private readonly handleTokenFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({mpbx_token: event.target.value})

    render() {
        return <ProfileFormView
            onSave={this.onSave}
            inProgress={this.props.inProgress}
            errorMessages={this.props.errorMessages}
            handleSnackBarClose={this.handleSnackBarClose}
            snackBarOpen={this.props.snackBarOpen}
            handleNameFieldChange={this.handleNameFieldChange}
            handleTokenFieldChange={this.handleTokenFieldChange}
            mpbx_token={this.state.mpbx_token}
            name={this.state.name}
            email={this.props.profile.email}
        />;
    }
}

const mapStateToProps = (state: RootState) => ({
    profile: state.userProfile.profile,
    inProgress: state.userProfile.inProgress,
    snackBarOpen: state.userProfile.profileForm.snackBarOpen,
    errorMessages: state.userProfile.profileForm.errorMessages
})

const mapDispatchToProps = (dispatch: RootThunkDispatch, props: OwnProps) => ({
    editProfile: (request: EditProfileRequestModel) => dispatch(editProfile(request, props.application.client)),
    closeSnackBar: () => dispatch(setProfileFormSnackbarOpen(false))
});

export default withAuthenticatedApplicationContext(
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )(ProfileForm)
)
