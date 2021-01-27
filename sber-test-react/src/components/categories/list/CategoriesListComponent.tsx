import * as React from "react"

import {CategoryItemComponent} from '../items/category/CategoryItemComponent'

import {SearchComponent} from "../../search/SearchComponent"
import * as I from './ICategoriesList'

export const CategoriesListComponent : React.FC<I.Props> = props =>  {

    const componentClass = "CategoriesListComponent"

    const {list, dataIsLoading, getCategoriesList} = props

    React.useEffect(()=> {
       getCategoriesList(null)
    }, [])

    return (
        <div className={componentClass}>
            <div className={`${componentClass}__search`}>
                <SearchComponent dataIsLoading={dataIsLoading} search={getCategoriesList} description="Введите значение для поиска категории, субкатегории или пункта меню" />
            </div>
            <div className={`${componentClass}__content`}>
                {list.map(item => <CategoryItemComponent item={item} key={JSON.stringify(item)}/>)}
            </div>                
        </div>        
    );
}
