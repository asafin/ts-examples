import * as React from "react";
import {AuthenticatedApplicationConsumer} from "./AuthenticatedApplicationContext"
import {AuthenticatedApplication} from "../../AuthenticatedApplication"

export function withAuthenticatedApplicationContext<
    P extends { application?: AuthenticatedApplication },
    R = Omit<P, 'application'>
    >(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
    return function BoundComponent(props: R) {
        return (
            <AuthenticatedApplicationConsumer>
                {value => <Component {...props as any} application={value} />}
            </AuthenticatedApplicationConsumer>
        );
    };
}
