import * as React from "react"
import { faFolderOpen, faFolder, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TypographyComponent } from "../../../typography/Typography"

import {TreeStatus} from '../../../../services/types'
import TreeItem from "../treeItem/TreeItem"
import * as I from './ITree'

export const TreeComponent : React.FC<I.Props> = props =>  {

    const [show, setShow] = React.useState<boolean>(true)

    const componentClass = "TreeComponent"

    const {item} = props

    const contentVisibleClass = show ? 'show' : 'hide'

    const getStatus = (status: TreeStatus) => {
        let text = ''

        if (status == "active") {
            text = 'Активный'
        }
        else if (status == "decline") {
            text = 'Отклонён'
        }
        else if (status == "edit") {
            text = 'Редактирование'
        }
        else if (status == "onApproval") {
            text = 'На согласовании'
        }

        return text
    }

    return (
        <div className={`${componentClass} ${contentVisibleClass}`}>
            <div className={`${componentClass}__title`} onClick={()=> setShow(!show)}>
                <FontAwesomeIcon className={`${componentClass}__title__icon ${componentClass}__title__icon_caret`} icon={faCaretDown}/>
                <FontAwesomeIcon className={`${componentClass}__title__icon ${componentClass}__title__icon_folder`} icon={show ? faFolderOpen : faFolder}/>
                <TypographyComponent variant="h3-title">
                    {item.title}
                </TypographyComponent>        
                <TypographyComponent variant="p">
                    {getStatus(item.status)}
                </TypographyComponent>           
            </div>
            <div className={`${componentClass}__content`}>
                {item.items.map(elem => <TreeItem item={elem} key={JSON.stringify(elem)} />)}
            </div>
        </div>
    )
}