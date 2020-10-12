import {Profile} from "./../services/Profile"

export interface UserAutentificationReducer {
    inProgress: boolean,
    error: boolean,
    helperText: string,
    showIsDemoModalMessage: boolean,
    showOfferModalMessage: boolean,
    token: string,
    authenticated: boolean,
    demo: {
        text: string
    },
    offer: {
        text: string
    }
}

export interface UserProfileErrorMessageModel {
    name? : string,
    mpbx_token?: string
}

export interface UserProfileReducerModel {
    profile: Profile,
    inProgress: boolean,
    profileForm: {
        snackBarOpen: boolean,
        errorMessages: UserProfileErrorMessageModel
    }
}