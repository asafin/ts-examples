import * as React from "react"

import { TypographyComponent } from "../../typography/Typography"
import * as utils from './../../../services/utils'
import {SearchComponent} from "../../search/SearchComponent"

import { TreeComponent } from "../item/tree/TreeComponent"
import * as I from './ITreesList'

export const TreesListComponent : React.FC<I.Props> = props =>  {
    const componentClass = "TreesListComponent"

    const {list, items} = props

    const getHeader = () => {
        return (
            <TypographyComponent variant="h2-title">
                {list.title}
            </TypographyComponent>
        )
    }

    const getList = () => items.map(item => <TreeComponent item={item} key={JSON.stringify(item)}/>)

    const getContent = () => {
        if (!utils.isEmptyObj(list)) {
            return (
                <React.Fragment>
                    <div className={`${componentClass}__search`}>
                        <SearchComponent dataIsLoading={props.dataIsLoading} search={props.searchTreeList} description="Введите значение для поиска дерева или свойства дерева"/>
                    </div>                    
                    <div className={`${componentClass}__header`}>
                        {getHeader()}
                    </div>
                    <div className={`${componentClass}__list`}>
                        {getList()}
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <div className={`${componentClass}__empty`}>
                    <TypographyComponent variant="h3-title">
                        Выберите категорию
                    </TypographyComponent>
                </div>                
            )
        }
    }

    return (
        <div className={componentClass}>
            {getContent()}
        </div>        
    );
}
