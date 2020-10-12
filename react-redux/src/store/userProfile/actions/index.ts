import { Action, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'react'

import { WebClient } from '../../../services/WebClient'
import {
    GetProfileResponseModel, 
    EditProfileRequestModel,
    EditProfileResponseModel
} from '../../../services/types'
import * as types from '../types'
import {RootState} from '../../index'
import { Profile } from '../../../services/Profile'
import {Store} from "./../../../services/Store"
import {UserProfileErrorMessageModel} from "./../../interfaces"

type UserProfileThunkResult<R> = ThunkAction<R, RootState, undefined, Action>;

const store = new Store()

const setInProgress = () : Action => ({type: types.IN_PROGRESS})

const setProgressFinished = () : Action => ({type: types.PROGRESS_FINISHED})

export const setProfileFromStore = () : UserProfileThunkResult<Promise<void>> => async dispatch=> {    
    if (store.profile.get()) {
        dispatch(refreshProfile(store.profile.get().token))
    }
    else {
        dispatch(clearProfile())
    }    
}

const clearProfile = (): Action => ({type: types.CLEAR_PROFILE})

export const setProfile = (profile: Profile) : AnyAction => ({type: types.SET_PROFILE, profile})

export const refreshProfile = (authToken?: string) : UserProfileThunkResult<Promise<void>> => async (dispatch, getState) => {
    
    dispatch(setInProgress())

    let token : string = authToken ? authToken : getState().userAutentification.token 

    const client = new WebClient(authToken)

    client.getProfile()
        .then((response: GetProfileResponseModel) => {
            let profile : Profile = {
                token,
                recordId: response.id,
                email: response.email,
                roles: response.roles,
                name: response.name,
                mpbx_token: response.mpbx_token,
                api: 'asterisk'
            } 

            dispatch(setProfile(store.profile.set(profile)))
            dispatch(setProgressFinished())            
        }, (error: any) => {
            console.log('getProfile error', error)
            store.clear()
            dispatch(setProgressFinished()) 
            dispatch(clearProfile())
        })
}

export const handleLogout = () => (dispatch: Dispatch<AnyAction>) => {
    store.clear()
    dispatch(clearProfile())
    window.location.href = '/'
}

export const setProfileFormSnackbarOpen = (snackBarOpen: boolean) : AnyAction => ({type: types.SET_PROFILE_FORM_SNACKBAR_OPEN, snackBarOpen})

const clearProfileFormErrorMessages= () : Action => ({type: types.CLEAR_PROFILE_FORM_ERROR_MESSAGES})

const setProfileFormErrorMessages = (errorMessages: UserProfileErrorMessageModel) : AnyAction => ({type: types.SET_PROFILE_FORM_SNACKBAR_OPEN, errorMessages})

export const editProfile = (request: EditProfileRequestModel, client: WebClient) : UserProfileThunkResult<Promise<void>> => async dispatch=> {
    dispatch(setInProgress())
    dispatch(setProfileFormSnackbarOpen(false))
    dispatch(clearProfileFormErrorMessages())

    client.editProfile(request)
        .then((response: EditProfileResponseModel) => {
            dispatch(setProgressFinished()) 
            if (response.error) {
                dispatch(setProfileFormErrorMessages({
                    mpbx_token: response.error.mpbx_token ? response.error.mpbx_token : null,
                    name: response.error.name ? response.error.name : null
                }))
            }
            else {
                dispatch(setProfileFormSnackbarOpen(true))
                //TODO dispatch(getUserStatus())
                dispatch(refreshProfile())
            }
        }, error => {
            console.log('editProfile error', error)
            dispatch(setProgressFinished()) 
            dispatch(clearProfileFormErrorMessages())
        })
}