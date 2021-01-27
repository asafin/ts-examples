import * as React from "react"
import { faLayerGroup, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TypographyComponent } from "../../../typography/Typography"
import MenuItem from "./../menu/MenuItem"
import * as I from './ISubCategoryItem'

export const SubCategoryItemComponent : React.FC<I.Props> = props => {

    const [show, setShow] = React.useState<boolean>(false)

    const {item} = props

    const componentClass = "SubCategoryItemComponent"    

    const contentVisibleClass = show ? 'show' : 'hide'

    return (
        <div className={`${componentClass} ${contentVisibleClass}`}>
            <div className={`${componentClass}__title`} onClick={()=> setShow(!show)}>
                <FontAwesomeIcon className={`${componentClass}__title__icon ${componentClass}__title__icon_caret`} icon={faCaretDown}/>
                <FontAwesomeIcon className={`${componentClass}__title__icon `} icon={faLayerGroup}/>
                <TypographyComponent variant="h3-title">
                    {item.title}
                </TypographyComponent>                  
            </div>
            <div className={`${componentClass}__content`}>
                {item.items.map(elem => <MenuItem key={JSON.stringify(elem)} item={elem}/>)}
            </div>
        </div>
    )
}
