import {USER_ROLES} from "./types"

export type ApiType = 'asterisk' | 'beeline' 

export interface Profile {
    recordId : number,
    token : string,
    email : string,
    roles : USER_ROLES [],
    name? : string,
    mpbx_token?: string,
    api: ApiType
}
