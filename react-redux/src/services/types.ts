import { ApiType } from "./Profile"

export type Order = 'asc' | 'desc'

export interface AbonentCallModel {
    id: number,
    external_id: string,
    phone: string,
    direction: CallDirection,
    date: number,
    duration: number,
    mpbx_user_name: string,
    mpbx_extension: number,
    tags: string [],
    conversation: string
}

export interface CallListSortModel {
    order: Order,
    orderBy: keyof AbonentCallModel
}

export type CallDirection = 0 | 1 | 2

export interface DateRangeModel {
    from: number,
    to: number
}

export interface CallDurationRangeModel {
    min: number,
    max: number
}

export interface CallListFilterModel {
    dateRange: DateRangeModel,
    abonents: number [],
    callDirection: CallDirection,
    searchText: string,
    searchPhone: string,
    glossaries: number [] 
}

export interface CallListRequestModel {
    offset: number,
    quantity: number,
    sort: CallListSortModel,
    filter: CallListFilterModel
}

export interface SaveCallListFilterSettingsRequestModel extends CallListFilterModel {

}

export interface EditProfileRequestModel {
    name?: string,
    mpbx_token?: string,
    password?: string
}

export interface EditProfileResponseModel {
    status: string,
    error: {
        name ? : string,
        mpbx_token ?: string,
        password ? : string
    }
}

export interface AbonentModel {
    id: string,
    name: string,
    enabled: boolean
}

export interface AbonentsListRequestModel {
    offset: number,
    quantity: number
}

export interface AbonentsListResponseModel {
    total: number,
    abonents: AbonentModel [],
    error?: string
}

export interface EditAbonentsSettingsModel {
    recordId: string,
    enabled: boolean
}

export interface EditAbonentsSettingsResponseModel {
    status: string,
    error? : string
}

export interface LoginWithPasswordRequestModel {
    email: string,
    password: string
}

export enum USER_ROLES {
    ROLE_USER = "ROLE_USER"
}

export type ConversationChannel = 1 | 2

export interface ConversationModel {
    channel: ConversationChannel,
    start: number,
    value: string,
    tags: string []
}

export interface GetProfileResponseModel {
    token: string,
    id: number,
    email: string,
    name?: string,
    mpbx_token?: string,
    roles: USER_ROLES [],
    error: string,
    isDemo: boolean,
    api: ApiType
}

export interface LoginWithPasswordResponseModel {
    token ?: string,
    error ?: string,
    redirect ?: string,
    isDemo? : boolean,
    offerNotAccepted ? : boolean
}

export interface AbonentCallModel {
    id: number,
    external_id: string,
    phone: string,
    direction: CallDirection,
    date: number,
    duration: number,
    mpbx_user_name: string,
    mpbx_extension: number,
    tags: string [],
    wav: string
}

export interface GetCallsListResponseModel {
    total: number,
    total_nofilter: number,
    calls: AbonentCallModel [],
    error?: string 
}

export interface GetCallDurationRangeResponseModel {
    min: number,
    max: number
}

export interface MpbxAbonentModel {
    mpbx_extension: number,
    mpbx_user_name: string
}

export interface GetCallResponseModel {
    id: number,
    mpbx_id: string,
    external_id: string,
    phone: string,
    direction: CallDirection,
    date: number,
    duration: number,
    mpbx_user: string,
    mpbx_user_name: string,
    mpbx_extension: number,
    tags: string [],
    wav: string,
    conversation: ConversationModel []
}

export interface GetCallDateRangeModel {
    min: string,
    max: string
}

export interface GetUserStatusResponseModel {
    message?: string,
    redirect?: string,
    status?: string
}


export interface DeleteCallResponseModel {
    success?: boolean,
    error?: string
}

export interface GetIsDemoMessageResponseModel {
    message: string
}

export interface GetOfferMessageResponseModel {
    message: string
}

export interface AcceptOfferMessageRequestModel {
    accepted: boolean
}

export interface AcceptOfferMessageResponseModel {
    success?: boolean
}

export interface LoginWithTokenRequestModel {
    token: string
}

export interface LoginWithTokenResponseModel {
    token?: string,
    error?: string
}

export interface GetBalanceResponseNodel {
    balance: string,
    daysLeft?: number
}

export type GlossaryApplicationChannelType = "all" | "client" | "operator"

export type GlossaryActuationTypeType = "present" | "nonpresent"

export interface GlossaryModel {
    actuationType: GlossaryActuationTypeType,
    applicationChannel: GlossaryApplicationChannelType,
    name: string,
    text: string
}

export interface ClientGlossaryModel extends GlossaryModel {
    recordId: number,
    system: boolean
}

export interface EditClientGlossaryRequestModel extends GlossaryModel {
    recordId: number
}

export interface GetClientGlossariesListResponseModel {
    total: number,
    items: ClientGlossaryModel [],
    error?: string 
}

export interface GetClientGlossaryResponseModel {
    glossary: GlossaryModel,
    error?: string 
}

export interface DeleteClientGlossaryResponseModel {
    success?: boolean,
    error?: string
}

export interface EditClientGlossaryResponseModel {
    success?: boolean,
    error?: string
}

export interface CreateClientGlossaryResponseModel {
    id?: number,
    error?: string
}

export interface EditAbonentRequestModel extends AbonentModel {

}

export interface EditAbonentResponseModel {
    success?: boolean,
    error?: string
}

export interface GetAbonentResponseModel {
    abonent: AbonentModel,
    error: string
}