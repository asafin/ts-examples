import { BaseClient } from './BaseClient'
import { MockClient } from './MockClient'
import { WebClient } from './WebClient'

export const getClient = ()  => {
    let client : BaseClient;

    if (process.env.CLIENT_TYPE == 'mock') {
        client = MockClient.getInstance()
    }
    else {
        client = WebClient.getInstance()
    }

    return client
} 