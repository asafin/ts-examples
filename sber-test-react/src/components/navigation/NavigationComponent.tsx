import * as React from "react";
import { faSpa, faBell, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NavigationComponent : React.FC<{}> = () =>  {

    const componentClass = 'NavigationComponent'

    return (
        <div className={componentClass}>
            <div className={`${componentClass}__content container container_desktop`}>
                <div className={`${componentClass}__column ${componentClass}__column_left`}>
                    <div className="logo">
                        <FontAwesomeIcon icon={faSpa} className="logo__icon"/>
                        <div className="logo__text">Logo</div>
                    </div>
                </div>
                <div className={`${componentClass}__column ${componentClass}__column_right`}>
                    <div className="userMenu">
                        <FontAwesomeIcon icon={faCog} className="userMenu__icon userMenu__icon_settings"/>
                        <FontAwesomeIcon icon={faBell} className="userMenu__icon userMenu__icon_notification" />  
                        <FontAwesomeIcon icon={faSignOutAlt} className="userMenu__icon userMenu__icon_logout" />                        
                    </div>
                </div>
            </div> 
        </div>
    );
}