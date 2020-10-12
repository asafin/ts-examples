import * as React from "react"
import { connect } from 'react-redux'

import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {AuthenticatedApplication} from "./AuthenticatedApplication"
import {Profile} from "./services/Profile"
import {PublicApplication} from "./public/PublicApplication"
import {RootState, RootThunkDispatch} from './store'
import {setProfileFromStore, handleLogout} from './store/userProfile/actions'

interface StateProps {
    profile: Profile
}

interface DispatchProps {
    setProfileFromStore: () => void,
    handleLogout: () => void
}

type Props = StateProps & DispatchProps

class Application extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount = (): void => {
        this.props.setProfileFromStore()
    }

    public readonly onLogout = () => this.props.handleLogout()

    render() {
        const pageClass = "Application"

        const getApp = () => {
            if (this.props.profile == null) {
                return <PublicApplication />
            } else {
                return <AuthenticatedApplication profile={this.props.profile}/>
            }
        }

        return (
            <div className={pageClass}>
                <Router>                        
                    <Switch>
                        {getApp()}
                    </Switch>
                </Router>
            </div>        
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    profile: state.userProfile.profile,
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) => ({
    setProfileFromStore: () => dispatch(setProfileFromStore()),
    handleLogout: () => dispatch(handleLogout())
});

export default connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(Application)
