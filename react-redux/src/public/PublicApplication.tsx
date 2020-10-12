import * as React from "react"
import { Route } from "react-router-dom"
import LoginComponent from "./login/LoginComponent"
import LoginWithTokenComponent from "./loginWithToken/LoginWithTokenComponent"

export const PublicApplication: React.FC<{}> = () => {

    const conponentClass = "PublicApplication"

    const loginPage = () => <LoginComponent />
    const loginWithTokenPage = () => <LoginWithTokenComponent />

    return (      
      <div className={conponentClass}>
        <div className={`${conponentClass}__header container container_tablet`}>
          <a href="https://beeline.ru/business/" className="header-logo"></a>
            <a href="https://beeline.ru/business/business-area/" className="header-link link_simple">В бизнес-кабинет</a>
        </div>
        <div className={`${conponentClass}__content container container_mobile`}>
          <Route component={loginPage} path="/" exact />
          <Route component={loginWithTokenPage} path="/redirect" exact />
        </div>
      </div>             
    );
}