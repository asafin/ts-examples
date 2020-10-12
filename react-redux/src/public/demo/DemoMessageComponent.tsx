import * as React from "react"
import { connect } from 'react-redux'
import { DemoMessageComponentView } from "./DemoMessageComponentView"
import {RootState, RootThunkDispatch} from './../../store'
import {getDemoMessage} from '../../store/userAutentification/actions'
import {refreshProfile} from './../../store/userProfile/actions'

interface StateProps {
    inProgress: boolean,
    message: string
}

interface DispatchProps {
    getDemoMessage: () => void,
    onSubmit: () => void
}

type Props = StateProps & DispatchProps

class DemoMessageComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);        
    }

    componentDidMount() {
        this.props.getDemoMessage();
    }

    render() {
        return <DemoMessageComponentView 
                inProgress={this.props.inProgress} 
                listener={this.props.onSubmit} 
                message={this.props.message}
                onClose={this.props.onSubmit}
            />;
    }
}

const mapStateToProps = (state: RootState) => ({
    inProgress: state.userAutentification.inProgress,
    message: state.userAutentification.demo.text
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) => ({
    getDemoMessage: () => dispatch(getDemoMessage()),
    onSubmit: () => dispatch(refreshProfile())
});

export default connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(DemoMessageComponent)