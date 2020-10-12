import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles"
import CloseIcon from '@material-ui/icons/Close';

export interface Props {
    content: React.ReactElement,
    onClose?: () => void,
    open: boolean,
    hideCloseIcon?: boolean
}

export const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            height: '80%',
            width: '80%',
            maxWidth: '960px',
            position: 'relative'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        icon: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            zIndex: 2
        }
    }),
);

export const PublicModalComponent: React.FC<Props> = props => {
    const classes = useStyles();

    const closeIcon = () => {
        if (!props.hideCloseIcon) {
            return (
                <div className={classes.icon} onClick={props.onClose}>
                    <CloseIcon fontSize="large" />
                </div>
            )
        } 
    }

    return (
        <mui.Modal
            className={classes.modal}
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={mui.Backdrop}
            BackdropProps={{
                timeout: 500,
                style: {backgroundColor: 'rgba(255, 255, 255, 0.8)'}
            }}
        >
            <mui.Fade in={props.open} >
                <mui.Card className={classes.paper} variant="outlined">
                    {closeIcon()}
                    {props.content}
                </mui.Card>
            </mui.Fade>
        </mui.Modal>
    )
}

