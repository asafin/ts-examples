import { Action, AnyAction } from 'redux'
import { WebClient } from '../../../services/WebClient'
import {
    LoginWithPasswordRequestModel, 
    LoginWithPasswordResponseModel, 
    GetIsDemoMessageResponseModel, 
    GetOfferMessageResponseModel, 
    LoginWithTokenResponseModel
} from '../../../services/types'
import * as types from '../types'
import { ThunkAction } from 'redux-thunk'
import {RootState} from '../../index'
import {refreshProfile} from './../../userProfile/actions'

const setInProgress = () : Action => ({type: types.IN_PROGRESS})

const setProgressFinished = () : Action => ({type: types.PROGRESS_FINISHED})

const setToken = (token: string) : AnyAction => ({type: types.SET_TOKEN, token})

const handleError = (helperText: string) : AnyAction => ({type: types.HAS_ERROR, helperText})

const isDemo = () : Action => ({type: types.IS_DEMO})

const offerNotAccepted = () : Action => ({type: types.OFFER_NOT_ACCEPTED})

export const setAutenticated = () : Action => ({type: types.SET_AUTENTICATED})

type UserAutentificationThunkResult<R> = ThunkAction<R, RootState, undefined, Action>;

export const handleLogin = (model: LoginWithPasswordRequestModel) : UserAutentificationThunkResult<Promise<void>> => async dispatch => {
    
    dispatch(setInProgress())

    const client = new WebClient()

    client.loginWithPassword(model)
        .then((response: LoginWithPasswordResponseModel) => {
            if (response.error) {
                dispatch(handleError(response.error))
            }
            else {
                dispatch(setProgressFinished())
                dispatch(setToken(response.token))

                if (response.isDemo) {
                    dispatch(isDemo())
                } 
                else if (response.offerNotAccepted) {
                    dispatch(offerNotAccepted())
                }
                else {
                    dispatch(refreshProfile(response.token))
                }
            }            
        }, (error: any) => {
            console.log('loginWithPassword error', error)
            dispatch(setProgressFinished())
        })
}

const setDemoMessage = (text: string) : AnyAction => ({type: types.SET_DEMO_MESSAGE, text})

export const getDemoMessage = () : UserAutentificationThunkResult<Promise<void>> => async (dispatch, getState) => {
    dispatch(setInProgress())

    const token = getState().userAutentification.token

    const client = new WebClient(token)

    client.getIsDemoMessage()
        .then((response: GetIsDemoMessageResponseModel) => {
            dispatch(setProgressFinished())
            if (response.message) {
                dispatch(setDemoMessage(response.message))
            }
        }, (error: any) => {
            console.log('getIsDemoMessage', error)
            dispatch(setProgressFinished())
        })

}

const setOfferMessage = (text: string) : AnyAction => ({type: types.SET_OFFER_MESSAGE, text})

export const getOfferMessage = () : UserAutentificationThunkResult<Promise<void>> => async (dispatch, getState) => {
    dispatch(setInProgress())

    const token = getState().userAutentification.token

    const client = new WebClient(token)

    client.getOfferMessage()
        .then((response: GetOfferMessageResponseModel) => {
            dispatch(setProgressFinished())
            if (response.message) {
                dispatch(setOfferMessage(response.message))
            }
        }, (error: any) => {
            console.log('getOfferMessage', error)
            dispatch(setProgressFinished())
        })

}

export const loginWithToken = (token: string) : UserAutentificationThunkResult<Promise<void>> => async dispatch => {
    
    dispatch(setInProgress())

    const client =  new WebClient()

    client.loginWithToken({token})
        .then((response: LoginWithTokenResponseModel) => {
            dispatch(setProgressFinished())

            if (response.error) {
                dispatch(handleError(response.error))
            }
            else {
                dispatch(setToken(response.token))
                dispatch(refreshProfile(response.token))
            }            
        }, (error: any) => {
            console.log('loginWithToken error', error)
            dispatch(setProgressFinished())
        })
}