/*
 |--------------------------------------------------------------------------
 | user store
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'

export default
class user extends Store {

    constructor(flux) {

        super();

        this.registerAsync(flux.getActions('users').fetch, null, this._update, this._error);

        this.state = {
            user: null,
            error: null
        }
    }

    _update(user) {
        this.setState({
            user: user.user,
            error: null
        })
    }

    _error(err) {
        this.setState({
            error: err
        })
    }

    get getState() {
        return this.state
    }
}