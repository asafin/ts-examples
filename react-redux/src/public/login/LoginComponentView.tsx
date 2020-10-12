import * as React from "react";
import { ActionButton } from "../../components/buttons/Buttons";
import { TypographyComponent } from "../../components/typography/Typography";
import { InputTextComponent } from "../../components/input/InputComponent";

export interface Props {
    handleSubmit: () => void,
    inProgress: boolean,
    login: string,
    password: string,
    handleLoginFieldChange:  (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlePasswordFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error: boolean,
    helperText: string
}

export const LoginComponentView : React.FC<Props> = props => {

    const componentClass = "LoginPageComponentView"

    const {inProgress, handleSubmit, error, helperText, login, password, handleLoginFieldChange, handlePasswordFieldChange} = props

    return (
        <div className={componentClass}>
            <div className={`${componentClass}__header`}>
                <div className="header-logo">
                </div>
                <TypographyComponent variant="h1-title">
                    Речевая Аналитика
                </TypographyComponent>
            </div>
            <div className={`${componentClass}__content`}>
                <div className={`${componentClass}__item`}>
                    <InputTextComponent 
                        value={login} 
                        onChange={handleLoginFieldChange} 
                        placeholder="Логин" 
                        description={helperText} 
                        error={error}
                    />
                </div>
                <div className={`${componentClass}__item`}>
                    <InputTextComponent 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordFieldChange} 
                        placeholder="Пароль" 
                        description={helperText} 
                        error={error} 
                    />
                </div>
                <div className={`${componentClass}__actions`}>
                    <ActionButton title="Войти" listener={handleSubmit} primary={true} disabled={inProgress} />
                </div>                    
            </div>                  
        </div>
    );

}

