import * as React from "react"
import { connect } from 'react-redux'

import {LoginComponentView} from "./LoginComponentView"
import Application from "../../Application"
import {withApplicationContext} from "../../services/context/WithApplicationContext"
import {LoginWithPasswordRequestModel} from "../../services/types"
import DemoMessageComponent from "../demo/DemoMessageComponent"
import OfferMessageComponent from "../offer/OfferMessageComponent"
import { SmallModalComponent } from "../../components/modal/SmallModalComponent"
import {RootState, RootThunkDispatch} from './../../store'
import {handleLogin} from '../../store/userAutentification/actions'
import {refreshProfile} from './../../store/userProfile/actions'

interface StateProps {
    inProgress: boolean,
    error: boolean,
    helperText: string,
    showIsDemoModalMessage: boolean,
    showOfferModalMessage: boolean
}

interface DispatchProps {
    handleLogin: (model: LoginWithPasswordRequestModel) => Promise<void>,
    refreshProfile: () => void
}

type Props = StateProps & DispatchProps

interface State {
    login: string,
    password: string
}

class LoginComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {     
            login: '',
            password: ''
        }
    }

    private readonly handleSubmit = () => this.props.handleLogin(this.createLoginWithPasswordRequest())

    private readonly createLoginWithPasswordRequest = () : LoginWithPasswordRequestModel => {
        return {
            email: this.state.login,
            password: this.state.password
        }
    }

    private readonly handleLoginFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({login: event.target.value})
    private readonly handlePasswordFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({password: event.target.value})

    render() {

        const demoMessageContent = () => <DemoMessageComponent />

        const offerMessageContent = () => <OfferMessageComponent/>

        return (
            <React.Fragment>
                <LoginComponentView 
                    handleSubmit={this.handleSubmit} 
                    inProgress={this.props.inProgress} 
                    error={this.props.error} 
                    helperText={this.props.helperText}
                    handleLoginFieldChange={this.handleLoginFieldChange}
                    handlePasswordFieldChange={this.handlePasswordFieldChange}
                    login={this.state.login}
                    password={this.state.password}
                />
                <SmallModalComponent content={demoMessageContent()} onClose={this.props.refreshProfile} open={this.props.showIsDemoModalMessage} height={700}/>
                <SmallModalComponent content={offerMessageContent()} onClose={() => {}} open={this.props.showOfferModalMessage} height={700}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    showIsDemoModalMessage: state.userAutentification.showIsDemoModalMessage,
    showOfferModalMessage: state.userAutentification.showOfferModalMessage,
    inProgress: state.userAutentification.inProgress,
    error: state.userAutentification.error,
    helperText: state.userAutentification.helperText
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) => ({
    handleLogin: (model: LoginWithPasswordRequestModel) => dispatch(handleLogin(model)),
    refreshProfile: () => dispatch(refreshProfile())
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)

