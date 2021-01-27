import {ChangeTreeItemRequestModel} from './../types'
import {BaseClient} from './BaseClient'

export class WebClient extends BaseClient {

    private static instance: WebClient
	
    private readonly url = process.env.BASE_URL
    
    public static getInstance (): WebClient {
        if (!WebClient.instance) {
            WebClient.instance = new WebClient();
        }

        return WebClient.instance
    }

    public readonly getCategoryList = (search?: string) => fetch(`${this.url}/rest/categories/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: search
	})
        .then(response => this.parseResponse(response))  

    public readonly getTrees = (id: number, search?: string) => fetch(`${this.url}/rest/trees/${id}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({id, search})
    })
        .then(response => this.parseResponse(response))   
        
    public readonly editTreeItem = (model: ChangeTreeItemRequestModel) => fetch(`${this.url}/trees/${model.recordId}/edit/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model)
    })
        .then(response => this.parseResponse(response)); 
}