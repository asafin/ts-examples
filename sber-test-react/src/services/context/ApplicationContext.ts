import * as React from "react";
import {Application} from "../../app/Application"

export const ApplicationContext = React.createContext<Application | null>(null)

export const ApplicationProvider = ApplicationContext.Provider;

export const ApplicationConsumer = ApplicationContext.Consumer;
