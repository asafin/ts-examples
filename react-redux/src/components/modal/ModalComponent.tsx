import * as React from "react";
import 'date-fns';
import * as mui from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles"
import CloseIcon from '@material-ui/icons/Close';

export interface Props {
    content: React.ReactElement,
    onClose: () => void,
    open: boolean
}

export const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            height: '90%',
            width: '100%',
            maxWidth: '1024px',
            position: 'relative'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        icon: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            zIndex: 2
        }
    }),
);

export const ModalComponent: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <mui.Modal
            className={classes.modal}
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={mui.Backdrop}
            BackdropProps={{
                timeout: 500,
                style: {backgroundColor: 'rgba(255, 255, 255, 0.9)'}
            }}
        >
            <mui.Fade in={props.open} >
                <mui.Card className={classes.paper} variant="outlined">
                    <div className={classes.icon} onClick={props.onClose}>
                        <CloseIcon fontSize="large" />
                    </div>
                    {props.content}
                </mui.Card>
            </mui.Fade>
        </mui.Modal>
    )
}

