import {ChangeTreeItemRequestModel, CategoryMenuItem, TreeList} from '../types'
import * as data from './data'
import {BaseClient} from './BaseClient'

export class MockClient extends BaseClient {

    private static instance: MockClient

    public static getInstance (): MockClient {
        if (!MockClient.instance) {
            MockClient.instance = new MockClient();
        }

        return MockClient.instance
    }

	public readonly getCategoryList = async (search?: string): Promise<CategoryMenuItem []> => {

        let list = data.categoryList

        if (search && search.length > 0) {
            list = list.filter(item => data.filterCategoryItems(item, search))
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(list)
            }, 100)
        })
    }

	public readonly getTrees = async (id: number, search?: string): Promise<TreeList> => {

        const tree  = data.treesData.find(item => item.recordId == id)

        if (search && search.length > 0) {
            tree.items = tree.items.filter(item => data.filterTree(item, search))            
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(tree)
            }, 100)
        })
    }
        
    public readonly editTreeItem = async (model: ChangeTreeItemRequestModel): Promise<boolean> => {
        console.log('editTreeItem', model)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }
}
