import {MenuItem} from '../../../../services/types'

export interface OwnProps {
    item: MenuItem
}

export interface StateProps {
    selectedRecordId: number
}

export interface DispatchProps {
    handleMenuItemClick: (selectedRecordId: number) => void
}

export type Props = OwnProps & StateProps & DispatchProps