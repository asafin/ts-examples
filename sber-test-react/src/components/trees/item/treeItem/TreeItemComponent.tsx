import * as React from "react"

import { faPencilAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {ChangeTreeItemRequestModel} from '../../../../services/types'
import { TypographyComponent } from "../../../typography/Typography"

import { InputTextComponent } from "../../../input/InputComponent"
import * as I from './ITreeItem'


export const TreeItemComponent : React.FC<I.Props> = props => {

    const {item, changeValue, inProgress, editedTreeItemId, setEditedTreeItemId} = props
    
    const [inputValue, setInputValue] = React.useState<number>(item.value)

    const componentClass = "TreeItemComponent"

    const createChangeTreeItemRequestModel = () : ChangeTreeItemRequestModel => ({
        recordId: item.recordId,
        value: inputValue
    }) 

    const handleCancelIconClick = () => {
        setInputValue(item.value)
        setEditedTreeItemId(null)
    }

    const handleEditIconClick = () => {
        changeValue(createChangeTreeItemRequestModel())
    }

    const handleInputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(parseInt(event.target.value))

    const getValue = () => {
        if (editedTreeItemId == item.recordId) {
            return (
                <InputTextComponent value={inputValue.toString()} onChange={handleInputFieldChange} disabled={inProgress}/>
            )
        }
        else {
            return (
                <TypographyComponent variant="p">
                    {item.value}
                </TypographyComponent>
            )
        }
    }

    const getActions = () => {
        if (editedTreeItemId == item.recordId) {
            return (
                <React.Fragment>
                    <FontAwesomeIcon className={`${componentClass}__icon ${componentClass}__icon_cancel`} icon={faTimes} onClick={handleCancelIconClick}/>
                    <FontAwesomeIcon className={`${componentClass}__icon ${componentClass}__icon_save`} icon={faSave} onClick={handleEditIconClick}/>                    
                </React.Fragment>
            )
        }
        else {
            return (
                <FontAwesomeIcon className={`${componentClass}__icon ${componentClass}__icon_edit`} icon={faPencilAlt} onClick={() => setEditedTreeItemId(item.recordId)}/>
            )
        }
    }

    return (
        <div className={`${componentClass} `} >
            <div className={`${componentClass}__title`} >
                {item.title}
            </div>
            <div className={`${componentClass}__value`} >
                {getValue()}
            </div>
            <div className={`${componentClass}__actions`} >
                {getActions()}
            </div>
        </div>
    )
}
