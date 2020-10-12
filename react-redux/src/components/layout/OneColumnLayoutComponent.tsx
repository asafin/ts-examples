import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";

export interface Props {
    content: React.ReactElement
}

export const OneColumnLayoutComponent: React.FC<Props> = props => {

    return (
        <mui.Grid container spacing={4}>
            <mui.Grid item xs={12}>
                {props.content}
            </mui.Grid>
        </mui.Grid>
    )
}

