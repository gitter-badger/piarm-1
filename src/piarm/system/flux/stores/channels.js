/*
 |--------------------------------------------------------------------------
 | channels store
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'

export default
class channels extends Store {

    constructor(flux) {

        super();

        this.registerAsync(flux.getActions('channels').fetch, null, this._update, this._error);
        this.register(flux.getActions('channels').destroy, this.update);

        this.state = {
            channels: null,
            error: null
        }
    }

    _update(channels) {
        this.setState({
            channels: channels.channels,
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