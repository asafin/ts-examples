import * as React from "react"
import { connect } from 'react-redux'

import { OfferMessageComponentView } from "./OfferMessageComponentView"
import { WebClient } from "../../services/WebClient"
import {RootState, RootThunkDispatch} from './../../store'
import {getOfferMessage} from '../../store/userAutentification/actions'
import {refreshProfile} from './../../store/userProfile/actions'

interface StateProps {
    inProgress: boolean,
    message: string
}

interface DispatchProps {
    getOfferMessage: () => void,
    onSubmit: () => void
}

type Props = StateProps & DispatchProps

class OfferMessageComponent extends React.Component<Props> {

    private readonly client : WebClient

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.props.getOfferMessage();
    }

    render() {
        return <OfferMessageComponentView 
                inProgress={this.props.inProgress} 
                listener={this.props.onSubmit} 
                message={this.props.message}
            />;
    }
}

const mapStateToProps = (state: RootState) => ({
    inProgress: state.userAutentification.inProgress,
    message: state.userAutentification.demo.text
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) => ({
    getOfferMessage: () => dispatch(getOfferMessage()),
    onSubmit: () => dispatch(refreshProfile())
});

export default connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(OfferMessageComponent)
