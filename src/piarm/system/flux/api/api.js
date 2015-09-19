/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import env from '../../../env'
import mocks from './mocks/client'

class Client {

    read(type) {

        return new Promise((resolve, reject) => {

            if (!env.mockClient) {
                // pass on to backend to handle (liable to change)
            } else {
                if (!env.errorsOnly) {
                    resolve(mocks.mock(type))
                } else {
                    reject(false)
                }
            }
        })
    }
}

class Server {

    push() {

    }
}

let client = new Client();
let server = new Server();
export { client, server };