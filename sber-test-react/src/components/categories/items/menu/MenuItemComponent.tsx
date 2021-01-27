import * as React from "react"
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TypographyComponent } from "../../../typography/Typography"
import * as I from './IMenuItem'

export const MenuItemComponent : React.FC<I.Props> = props => {
    const {item, handleMenuItemClick, selectedRecordId} = props

    const componentClass = "MenuItemComponent"

    const selected = selectedRecordId === item.recordId ? `${componentClass}__selected` : ''

    return (
        <div className={`${componentClass} ${selected}`} onClick={()=> handleMenuItemClick(item.recordId)} >
            <FontAwesomeIcon icon={faFile}/>
            <TypographyComponent variant="p">
                {item.title}
            </TypographyComponent>   
        </div>
    )
}
