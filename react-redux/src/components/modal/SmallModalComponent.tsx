import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles"

export interface Props {
    content: React.ReactElement,
    onClose: () => void,
    open: boolean,
    height: number
}

export const useStyles = makeStyles(() =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }),
);

export const SmallModalComponent: React.FC<Props> = props => {
    const classes = useStyles();

    const componentClass = "SmallModalComponent";

    const paperStyle = {
        width: '75%',
        maxWidth: '768px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const contentStyle = {height: props.height}

    return (
        <mui.Modal
            className={classes.modal}
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={mui.Backdrop}
            disableAutoFocus={true}
            BackdropProps={{
                timeout: 500,
                style: {backgroundColor: 'rgba(255, 255, 255, 0.8)'}
            }}
        >
            <mui.Fade in={props.open} >
                <div className={componentClass} style={contentStyle}>
                    <div className={`${componentClass}__contentWrapper`}>
                        {props.content}                        
                    </div> 
                </div>                      
            </mui.Fade>
        </mui.Modal>
    )
}
 
