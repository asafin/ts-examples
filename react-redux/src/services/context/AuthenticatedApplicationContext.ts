import * as React from "react";
import {AuthenticatedApplication} from "../../AuthenticatedApplication"

export const AuthenticatedApplicationContext = React.createContext<AuthenticatedApplication | null>(null)

export const AuthenticatedApplicationProvider = AuthenticatedApplicationContext.Provider;

export const AuthenticatedApplicationConsumer = AuthenticatedApplicationContext.Consumer;
