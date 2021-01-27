import {CategoryMenuItem} from '../../../services/types'

export interface StateProps {
    list: CategoryMenuItem [],
    dataIsLoading: boolean
}

export interface DispatchProps {
    getCategoriesList: (search: string) => void
}

export type Props = StateProps & DispatchProps