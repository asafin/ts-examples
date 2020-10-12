import {
    AbonentsListRequestModel,
    CallListRequestModel,
    EditAbonentsSettingsModel,
    EditProfileRequestModel, 
    LoginWithPasswordRequestModel, 
    AcceptOfferMessageRequestModel, 
    LoginWithTokenRequestModel, 
    GlossaryModel, 
    EditAbonentRequestModel,
    EditClientGlossaryRequestModel
} from "./types"

export class WebClient {

    private readonly url = process.env.BASE_URL

    constructor(private readonly token?: string) {}

    public readonly loginWithPassword = (model: LoginWithPasswordRequestModel) => fetch(`${this.url}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: model.email,
            password: model.password
        })
    })
        .then(response => response.json())

    public readonly loginWithToken = (model: LoginWithTokenRequestModel) => fetch(`${this.url}/login/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model)
    })
        .then(response => response.json())    

    public readonly getCallList = (model: CallListRequestModel) => fetch(`${this.url}/rest/calls/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.token
        },
        body: JSON.stringify(model)
    })
        .then(response => this.parseResponse(response))

    public readonly getCall = (id: number) => fetch(`${this.url}/rest/call/${id}/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
        .then(response => this.parseResponse(response))

    public readonly deleteCall = (id: number) => fetch(`${this.url}/rest/call/${id}/delete/`, {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': this.token
            }
        })
            .then(response => this.parseResponse(response))    

    public readonly getProfile = () => fetch(`${this.url}/rest/user/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
        .then(response => this.parseResponse(response))

    public readonly getCallTagsList = () => fetch(`${this.url}/rest/calls/props/tags/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })  
        .then(response => this.parseResponse(response))

    public readonly getCallDurationRange = () => fetch(`${this.url}/rest/calls/props/duration/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
        .then(response => this.parseResponse(response))

    public readonly getAbonentsFilterList = () => fetch(`${this.url}/rest/calls/props/abonents/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
        .then(response => this.parseResponse(response)) 

    public readonly editProfile = (model: EditProfileRequestModel) => fetch(`${this.url}/rest/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.token
        },
        body: JSON.stringify(model)
    })
        .then(response => this.parseResponse(response))

    public readonly getAbonentsList = (model: AbonentsListRequestModel) => fetch(`${this.url}/rest/abonents/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.token
        },
        body: JSON.stringify(model)
    })
        .then(response => this.parseResponse(response))

    public readonly editAbonentsSettings = (model: EditAbonentsSettingsModel []) => fetch(`${this.url}/rest/abonents/save/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.token
        },
        body: JSON.stringify(model)
    })
        .then(response => this.parseResponse(response))

    public readonly getAbonent = (recordIdAbonent: string) => fetch(`${this.url}/rest/abonents/${recordIdAbonent}/`, {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': this.token
            }
        })
            .then(response => this.parseResponse(response))       

    public readonly editAbonent = (model: EditAbonentRequestModel) => fetch(`${this.url}/rest/abonents/${model.id}/edit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.token
            },
            body: JSON.stringify(model)
        })
            .then(response => this.parseResponse(response))    

    public readonly getCallDateRange = () => fetch(`${this.url}/rest/calls/props/date/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
        .then(response => this.parseResponse(response))

    public readonly getUserStatus = () => fetch(`${this.url}/rest/user/status/`, {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': this.token
            }
        })
        .then(response => this.parseResponse(response))

    public readonly getIsDemoMessage = () => fetch(`${this.url}/rest/modal/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
    .then(response => this.parseResponse(response))    

    public readonly getOfferMessage = () => fetch(`${this.url}/rest/offer/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
    .then(response => this.parseResponse(response)) 

    public readonly acceptOfferMessage = (model: AcceptOfferMessageRequestModel) => fetch(`${this.url}/rest/offer/accept/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.token
        },
        body: JSON.stringify(model)
    })
        .then(response => this.parseResponse(response))

    public readonly getBalance = () => fetch(`${this.url}/rest/balance/`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': this.token
        }
    })
        .then(response => this.parseResponse(response))    

    public readonly deleteClientGlossary = (id: number) => fetch(`${this.url}/rest/glossary/${id}/delete/`, {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': this.token
            }
        })
            .then(response => this.parseResponse(response))      

    public readonly editClientGlossary = (model: EditClientGlossaryRequestModel) => fetch(`${this.url}/rest/glossary/${model.recordId}/edit/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.token
        },
        body: JSON.stringify(model)
    })
        .then(response => this.parseResponse(response))     
        
    public readonly createClientGlossary = (model: GlossaryModel) => fetch(`${this.url}/rest/glossary/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.token
            },
            body: JSON.stringify(model)
        })
            .then(response => this.parseResponse(response))    

    public readonly getGlossaryList = () => fetch(`${this.url}/rest/glossary/list/`, {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': this.token
            }
        })
            .then(response => this.parseResponse(response))        
            
    public readonly getClientGlossary = (id: number) => fetch(`${this.url}/rest/glossary/${id}/`, {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': this.token
            }
        })
            .then(response => this.parseResponse(response))        
        
    private readonly parseResponse  = (response: Response) => {

        if (response.ok) {
            return response.json()
        }
        else {
            if(response.status == 401) {
                localStorage.clear();        
            }
            window.location.href = '/'
        }       
    }      
}
