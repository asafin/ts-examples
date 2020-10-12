import * as React from "react";
import * as mui from "@material-ui/core";
import { LoaderComponent } from "../../components/loader/LoaderComponent";
import * as messages from "./../../services/messages"

export interface Props {
    inProgress: boolean,
    error: string
}

const useStyles = mui.makeStyles(() =>
    mui.createStyles({
        root: {
            textAlign: 'center'
        },
        link: {
            paddingTop: 10
        }
    }),
);

export const LoginWithTokenComponentView : React.FC<Props> = props => {

    const classes = useStyles()

    const getLoader = () => {
        if (props.inProgress) {
            return <LoaderComponent />
        }
    }

    const getErrorMessage =() => {

        if (props.error) {
            return (
                <React.Fragment>
                    {messages.getCustomMessage(props.error)}
                    <mui.Typography align="center" variant="h6" className={classes.link}>
                        <mui.Link href="/" >
                            Перейти на страницу входа
                        </mui.Link>
                    </mui.Typography>                        
                </React.Fragment>
            )
        }
    }

    return (
        <div className={classes.root}>
            {getLoader()}
            {getErrorMessage()}
        </div>
    );
}
