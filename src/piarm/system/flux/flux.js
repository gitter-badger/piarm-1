/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import { Flummox } from 'flummox'

import UserActions from './actions/users'
import UserStore from './stores/users'

import ChannelActions from './actions/channels'
import ChannelStore from './stores/channels'

class Flux extends Flummox {

    constructor() {

        super();

        this.createActions('users', UserActions);
        this.createStore('users', UserStore, this);

        this.createActions('channels', ChannelActions);
        this.createStore('channels', ChannelStore, this);
    }
}

const flux = new Flux();
export default flux;