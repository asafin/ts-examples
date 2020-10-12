import * as React from "react"

export type ProfileTabsType = 'main' | 'password'  

interface Props {
    activeTab: string,
    onClick: (tab: string) => void,
    renderLabel: (label: string) => string,
    values: string []
}

export const TabsNavigationComponent : React.FC<Props> = props =>  {

    const componentClass = 'TabsNavigationComponent'

    const getContent = () => props.values.map(item => {

        let cameraTabIsActive = props.activeTab == item ? 'active' : ''

        return (
            <div className={`${componentClass}__tab ${cameraTabIsActive}`} onClick={()=> props.onClick(item)} key={item}>
                {props.renderLabel(item)}
            </div>
        )
    })

    return (
        <div className={componentClass}>
            <div className={`${componentClass}__nav`}>
                {getContent()}
            </div>          
        </div>
    );
}