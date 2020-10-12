import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {GridSpacing} from "@material-ui/core/Grid/Grid"

export interface Props {
    left: React.ReactElement,
    right: React.ReactElement
}

export const TwoColumnsLayoutComponent: React.FC<Props> = props => {

    return (
        <mui.Grid container spacing={4}>
            <mui.Grid item xs={12} md={6}>
                {props.left}
            </mui.Grid>
            <mui.Grid item xs={12} md={6}>
                {props.right}
            </mui.Grid>
        </mui.Grid>
    )
}

