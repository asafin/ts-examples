import {LookupModel} from './types'

export const isEmptyObj = <T extends {}>(obj: T) => {
    for(const key in obj){
        return false;
    }
    return true;
}

export const findSubString = (title: string, search: string): boolean => title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) >= 0 

export const findStringInLookupModelItemList = (items: LookupModel [], search: string): boolean => 
    items.filter(menu => findSubString(menu.title, search)).length > 0