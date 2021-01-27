export interface LookupModel {
    recordId: number,
    title: string
}

export interface MenuItem extends LookupModel {
    
}

export interface SubCategoryMenuItem extends LookupModel {
    recordId: number,
    title: string,
    items: MenuItem []
}

export interface CategoryMenuItem extends LookupModel {
    recordId: number,
    title: string,
    items: SubCategoryMenuItem []
}

export type TreeStatus = 'active' | 'edit' | 'decline' | 'onApproval'

export interface TreeItem extends LookupModel {
    value: number
}

export interface Tree extends LookupModel {
    items: TreeItem [],
    status: TreeStatus
}

export interface TreeList extends LookupModel {
    items: Tree []
}

export interface ChangeTreeItemRequestModel {
    value: number,
    recordId: number
}