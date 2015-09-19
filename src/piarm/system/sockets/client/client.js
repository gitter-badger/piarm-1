/*
 |--------------------------------------------------------------------------
 | Socket to establish communication between the server and the client
 |--------------------------------------------------------------------------
 **/

import Flux from '../../flux/flux.js'
import io from 'socket.io-client'
import logger from '../../tools/logger'
import emitter from 'eventemitter3'

let log = logger.getLogger('[Client Socket]');

class Socket extends emitter {

    constructor() {

        super();

        this.socket = null;
        this.state = {
            user: {},
            authorized: false
        };

        Flux.getStore('users').on('change', this._users);
        Flux.getActions('users').fetch();
    }

    /**
     * Fetch the configured user.
     */
    _users = () => {
        let store = Flux.getStore('users').getState;

        if (!store.error) {
            this.state.user = store.user;
            log.debug('fetched user: ' + this.state.user.email);
            this._connect();
        } else {
            log.error(store.error)
        }
    };

    /**
     * Attempt to connect to the the piarm servers
     */
    _connect() {
        if (!this.socket) {
            this.socket = io('http://localhost:8888');
        }

        this.socket.on('connect', () => {
            log.info('connected, attempting authentication');

            /**
             * Pass the configured user to the servers for authentication
             */
            this.socket.emit('auth', this.state.user);
        });

        this.socket.on('auth', this._auth)
    }

    /**
     * Determine if authentication was successful
     * @param {json} res, json response object returned by the API
     *          containing authorization state and a status code
     */
    _auth = (res) => {
        if (res.authorized) {
            log.info('authenticated');
            this.state.authorized = true;
            this.pushState();

            /**
             * Emit auth
             */
            this.emit('auth', this.socket)
        } else {
            log.error('unauthorized. code: ' + res.status);

            /**
             * Emit auth_failed
             */
            this.emit('auth_failed', this.socket, res.status)
        }
    };

    /**
     * Push the systems current state to the server.
     * @param {function} cb - optional callback. err as first argument
     */
    pushState(cb) {
        if (this.state.authorized) {

        } else {
            cb(new Error('The socket has not been authorized yet'))
        }
    }
}
const run = new Socket();
export default run;