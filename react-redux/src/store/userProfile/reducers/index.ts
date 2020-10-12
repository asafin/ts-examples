import { AnyAction } from 'redux'

import {UserProfileReducerModel} from '../../interfaces'
import * as types from '../types'

const initialState : UserProfileReducerModel = {
    inProgress: false,
    profile: null,
    profileForm: {
        snackBarOpen: false,
        errorMessages: {
            mpbx_token: null,
            name: null
        }
    }
}

export const userProfileReducer = (state = initialState, action: AnyAction) : UserProfileReducerModel => {
    switch (action.type) {
        case types.IN_PROGRESS : {
            return {...state, inProgress: true}
        }
        case types.PROGRESS_FINISHED : {
            return {...state, inProgress: false}
        }
        case types.CLEAR_PROFILE: {
            return {...state, profile: null}
        }
        case types.SET_PROFILE: {
            return {...state, profile: {...state.profile, ...action.profile}}
        }
        case types.SET_PROFILE_FORM_SNACKBAR_OPEN: {
            return {...state, profileForm: {...state.profileForm, snackBarOpen: action.snackBarOpen}}
        }
        case types.CLEAR_PROFILE_FORM_ERROR_MESSAGES: {
            return {...state, profileForm: {...state.profileForm, errorMessages: {...state.profileForm.errorMessages, mpbx_token: null, name: null}}}
        }
        case types.SET_PROFILE_FORM_ERROR_MESSAGES: {
            return {...state, profileForm: {...state.profileForm, errorMessages: {
                ...state.profileForm.errorMessages, 
                mpbx_token: action.errorMessages.mpbx_token, 
                name: action.errorMessages.name
            }}}
        }
        default:
            return state
    }
}