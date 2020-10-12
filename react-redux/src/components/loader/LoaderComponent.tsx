import * as React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles(() =>
    createStyles({
        loader: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }
    }),
);

export const LoaderComponent: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <div className={classes.loader}>
            <img src="/images/loader.svg" />
        </div>
    )
}

