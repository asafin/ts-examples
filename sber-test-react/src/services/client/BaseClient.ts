import {ChangeTreeItemRequestModel, CategoryMenuItem, TreeList} from '../types'

export abstract class BaseClient {

    public abstract getCategoryList (search ?: string) : Promise<CategoryMenuItem []>

    public abstract getTrees (id: number, search ?: string) : Promise<TreeList> 
        
    public abstract editTreeItem (model: ChangeTreeItemRequestModel) : Promise<boolean>

    protected readonly parseResponse  = (response: Response) => {
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