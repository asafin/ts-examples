import { AnyAction } from 'redux'

import {UserAutentificationReducer} from '../../interfaces'
import * as types from '../types'

const initialState : UserAutentificationReducer = {
    inProgress: false,
    error: false,
    helperText: '',
    showIsDemoModalMessage: false,
    showOfferModalMessage: false,
    token: null,
    authenticated: false,
    demo: {
        text: ''
    },
    offer: {
        text: ''
    }
}

export const userAutentificationReducer = (state = initialState, action: AnyAction) : UserAutentificationReducer => {
    switch (action.type) {
        case types.IN_PROGRESS : {
            return {...state, inProgress: true}
        }
        case types.PROGRESS_FINISHED : {
            return {...state, inProgress: false}
        }
        case types.SET_TOKEN : {
            return {...state, token: action.token}
        }
        case types.HAS_ERROR: {
            return {...state, helperText: action.helperText, error: true, inProgress: false}
        }
        case types.IS_DEMO: {
            return {...state, showIsDemoModalMessage: true}
        }
        case types.OFFER_NOT_ACCEPTED: {
            return {...state, showOfferModalMessage: true}
        }
        case types.SET_AUTENTICATED: {
            return {...state, authenticated: true}
        }
        case types.SET_DEMO_MESSAGE: {
            return {...state, demo: {...state.demo, text: action.text}}
        }
        case types.SET_OFFER_MESSAGE: {
            return {...state, offer: {...state.offer, text: action.text}}
        }
        default:
            return state
    }
}