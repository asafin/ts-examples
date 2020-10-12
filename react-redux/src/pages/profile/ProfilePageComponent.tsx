import * as React from "react"
import { connect } from 'react-redux'

import ProfileForm from "../../components/forms/profile/ProfileForm"
import ChangePasswordForm from "../../components/forms/changePassword/ChangePasswordForm"
import { TypographyComponent } from "../../components/typography/Typography"
import { TabsNavigationComponent } from "./tabsNavigation/TabsNavigationComponent"
import {Profile} from "./../../services/Profile"
import {RootState} from './../../store'

interface StateProps {
    profile: Profile
}

const ProfilePageComponent : React.FC<StateProps> = props => {
    const [activeTab, setActiveTab] = React.useState<string>('main')

    const handleTabsChange = (tab: string) => setActiveTab(tab)

    const pageClass = "ProfilePageComponent"

    const renderTabsLabel = (tab: string) => {
        if (tab == 'main') {
            return 'Основные настройки'
        }
        else {
            return 'Смена пароля'
        }
    }

    const getContent = () => {
        if (props.profile.api == 'asterisk') {
            return activeTab == 'main' ? <ProfileForm /> : <ChangePasswordForm />
        }
        else {
            return <ProfileForm />
        }        
    }

    const getTabs = () => {
        if (props.profile.api == 'asterisk') {
            return <TabsNavigationComponent 
                activeTab={activeTab}
                onClick={handleTabsChange}
                values={['main', 'password']}
                renderLabel={renderTabsLabel}
            />
        }       
    }

    return (
        <div className={`${pageClass} container container_tablet`}>
            <div className={`${pageClass}__header`}>
                <TypographyComponent variant="h1-title">
                    Настройки
                </TypographyComponent>
            </div>
            <div className={`${pageClass}__content panel`}>
                {getTabs()}
                {getContent()}
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    profile: state.userProfile.profile,
})

export default connect<StateProps, {}, {}>(
    mapStateToProps,
    null
)(ProfilePageComponent)