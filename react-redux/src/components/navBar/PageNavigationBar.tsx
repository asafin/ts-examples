import * as React from "react";
import { connect } from 'react-redux'

import { LinkButton, SimpleButton } from "../buttons/Buttons"
import ClientsBalanceComponent from "./ClientsBalanceComponent"
import {handleLogout} from './../../store/userProfile/actions'
import {RootThunkDispatch} from './../../store'

export interface DispatchProps {
    onLogout: () => void
}

const PageNavigationBar: React.FC<DispatchProps> = props => {

    const { onLogout} = props

    const componentClass = "PageNavigationBar"

    return (
        <div className={componentClass}>
            <div className="container_tablet container">
                <div className={`${componentClass}__content`}>
                    <ClientsBalanceComponent />
                    <LinkButton title="Настройки" path="/profile" />
                    <SimpleButton listener={onLogout} title="Выход" />
                </div>                
            </div>            
        </div>
    );
}


const mapDispatchToProps = (dispatch: RootThunkDispatch) => ({
    onLogout: () => dispatch(handleLogout())
});

export default connect<{}, DispatchProps>(
    null,
    mapDispatchToProps
)(PageNavigationBar)