import {TreeList, Tree} from './../../../services/types'

export interface StateProps {
    list: TreeList,
    items: Tree [],
    dataIsLoading: boolean
}

export interface DispatchProps {
    searchTreeList: (search: string) => void
}

export type Props =  StateProps & DispatchProps