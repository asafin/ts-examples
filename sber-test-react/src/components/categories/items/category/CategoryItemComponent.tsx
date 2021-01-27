import * as React from "react"
import { faFolderOpen, faFolder, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { TypographyComponent } from "../../../typography/Typography"
import {SubCategoryItemComponent} from "../subCategory/SubCategoryItemComponent"
import * as I  from './ICategoryItem'


export const CategoryItemComponent : React.FC<I.Props> = props => {

    const [show, setShow] = React.useState<boolean>(false)

    const {item} = props

    const componentClass = "CategoryItemComponent"    

    const contentVisibleClass = show ? 'show' : 'hide'

    return (
        <div className={`${componentClass} ${contentVisibleClass}`}>
            <div className={`${componentClass}__title`} onClick={()=> setShow(!show)}>
                <FontAwesomeIcon className={`${componentClass}__title__icon ${componentClass}__title__icon_caret`} icon={faCaretDown}/>
                <FontAwesomeIcon className={`${componentClass}__title__icon ${componentClass}__title__icon_folder`} icon={show ? faFolderOpen : faFolder}/>
                <TypographyComponent variant="h3-title">
                    {item.title}
                </TypographyComponent>                
            </div>
            <div className={`${componentClass}__content`}>
                {item.items.map(elem => <SubCategoryItemComponent item={elem} key={JSON.stringify(elem)}/>)}
            </div>
        </div>
    )
}
