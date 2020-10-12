import * as React from "react"
import * as mui from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert'

import {UserProfileErrorMessageModel} from './../../../store/interfaces'
import { TypographyComponent } from "../../typography/Typography"
import { ActionButton } from "../../buttons/Buttons"
import { InputTextComponent } from "../../input/InputComponent"

export interface Props {
    onSave: () => void,
    inProgress: boolean,
    errorMessages: UserProfileErrorMessageModel,
    handleSnackBarClose: (event?: React.SyntheticEvent, reason?: string) => void,
    handleNameFieldChange:  (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTokenFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    snackBarOpen: boolean,
    name: string,
    mpbx_token: string,
    email: string
}

export const ProfileFormView : React.FC<Props> = props => {

    const pageClass = "ProfileFormView"

    const {
        inProgress, 
        onSave, 
        errorMessages, 
        handleSnackBarClose, 
        snackBarOpen, 
        name, 
        mpbx_token, 
        handleNameFieldChange, 
        handleTokenFieldChange,
        email
    } = props

    return (
        <div className={pageClass}>
            <div className={`${pageClass}__header`}>
                <TypographyComponent variant="h2-title">
                    Настройки профиля
                </TypographyComponent>
            </div>
            <div className={`${pageClass}__content`}>
                <div className="form-item">
                    <div className="form-item__label">
                        Email
                    </div>
                    <div className="form-item__elem">
                        <InputTextComponent 
                            defaultValue={email} 
                            placeholder="Email" 
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="form-item">
                    <div className="form-item__label">
                        Имя
                    </div>
                    <div className="form-item__elem">
                        <InputTextComponent 
                            value={name} 
                            onChange={handleNameFieldChange} 
                            placeholder="Имя" 
                            description={!!errorMessages.name ? errorMessages.name : ''}
                            error={!!errorMessages.name}
                        />
                    </div>
                </div>
                <div className="form-item">
                    <div className="form-item__label">
                        Токен ОАТС
                    </div>
                    <div className="form-item__elem">
                        <InputTextComponent 
                            value={mpbx_token} 
                            onChange={handleTokenFieldChange} 
                            placeholder="Токен ОАТС" 
                            description={!!errorMessages.mpbx_token ? errorMessages.mpbx_token : ''}
                            error={!!errorMessages.mpbx_token}
                        />
                    </div>
                </div>
                <div className="form-item form-item_actions">
                    <div className="form-item__label">                            
                    </div>
                    <div className="form-item__elem">
                            <ActionButton title="Сохранить" listener={onSave} primary={true} disabled={inProgress} />
                    </div>
                </div>
                <mui.Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                    <MuiAlert elevation={6} variant="filled" onClose={handleSnackBarClose} severity="success">
                        Данные профиля изменены.
                    </MuiAlert>
                </mui.Snackbar>
            </div>
        </div>
    );
}

