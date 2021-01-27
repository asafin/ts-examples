import * as React from "react";
import {ApplicationConsumer} from "./ApplicationContext"
import {Application} from "../../app/Application"

export function withApplicationContext<
    P extends { application?: Application },
    R = Omit<P, 'application'>
    >(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
    return function BoundComponent(props: R) {
        return (
            <ApplicationConsumer>
                { value => <Component {...props as any} application={value} />}
            </ApplicationConsumer>
        );
    };
}
