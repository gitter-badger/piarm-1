/*
 |--------------------------------------------------------------------------
 | users actions
 |--------------------------------------------------------------------------
 **/

import { Actions } from 'flummox'
import { client } from '../api/api'

export default
class users extends Actions {

    async fetch() {
        return await client.read('user')
    }
}