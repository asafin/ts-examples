import * as React from "react";
import { useHistory } from "react-router-dom";
import { LinkButton } from "../buttons/Buttons";

export interface Props {
}


export const MainNavigationBar: React.FC<Props> = props => {

    const history = useHistory();

    const componentClass = "MainNavigationBar"

    const onClick = () => {
        if (window.location.pathname == "/") {
            window.location.reload()
        } else {
            history.push("/");
        }
    }

    return (
        <div className={componentClass}>
            <div className="container_tablet container">
                <div className={`${componentClass}__content`}>
                    <div className={`${componentClass}__logo`} onClick={onClick}>
                        <img src="/images/logo_big.png" />
                    </div>
                    <LinkButton title="Звонки" path="/" />
                    <LinkButton title="Сотрудники" path="/staff" />
                    <LinkButton title="Словари" path="/glossary" />
                </div>                
            </div>            
        </div>
    );
}
