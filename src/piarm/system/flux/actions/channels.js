/*
 |--------------------------------------------------------------------------
 | channels actions
 |--------------------------------------------------------------------------
 **/

import { Actions } from 'flummox'
import { client } from '../api/api'

export default
class channels extends Actions {

    async fetch() {
        return await client.read('channels')
    }

    destroy() {
        return {channels: []};
    }

    remove(channel) {

    }
}