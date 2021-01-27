import * as React from "react"
import {ApplicationProvider} from "../services/context/ApplicationContext"
import {NavigationComponent} from "../components/navigation/NavigationComponent"
import CategoriesList from '../components/categories/list/CategoriesList'
import TreesList from "../components/trees/list/TreesList"

export interface Props {
}

export class Application extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const componentClass = "Application"

        return (
            <ApplicationProvider value={this}>
                <div className={componentClass}>
                    <NavigationComponent />
                    <div className={`${componentClass}__content container container_desktop`}>
                        <div className={`${componentClass}__column ${componentClass}__column_left`}>
                            <CategoriesList />
                        </div>
                        <div className={`${componentClass}__column ${componentClass}__column_right`}>                            
                            <TreesList />
                        </div>
                    </div>
                </div>
            </ApplicationProvider>
        );
    }
}

