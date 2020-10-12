import * as React from "react"
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import {createBrowserHistory} from "history"

import { LoginWithTokenComponentView } from "./LoginWithTokenComponentView"
import {RootState, RootThunkDispatch} from './../../store'
import {loginWithToken} from '../../store/userAutentification/actions'

interface StateProps {
    inProgress: boolean,
    error: string
}

interface DispatchProps {
    loginWithToken: (token: string) => void
}

interface State {
    token: string,
    redirect: boolean
}

const history = createBrowserHistory();

type Props = StateProps & DispatchProps

class LoginWithTokenComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            token: this.getTokenFromQueryParams(),
            redirect: false
        }
    }

    componentDidMount () {
        if (this.state.token){
            this.props.loginWithToken(this.state.token)
        } else {
            this.setState({redirect: true})
        }
    }

    private readonly getTokenFromQueryParams = () : string => {
        let urlSearchParams = new URLSearchParams(window.location.search)

        let token : string = null;
        if (urlSearchParams.get('token')) {
            token = urlSearchParams.get('token')
        }

        return token
    } 

    render() {

        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to="/" />
        }

        return <LoginWithTokenComponentView error={this.props.error} inProgress={this.props.inProgress}/>;
    }
}

const mapStateToProps = (state: RootState) => ({
    inProgress: state.userAutentification.inProgress,
    error: state.userAutentification.helperText
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) => ({
    loginWithToken: (token: string) => dispatch(loginWithToken(token))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(LoginWithTokenComponent)