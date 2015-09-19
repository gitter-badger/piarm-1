/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

export default
class state {

    constructor() {

    }

    getState(module, cb) {

        module.hash
        if (arguments.length == 1 && typeof module === 'function') {
            cb = module
        }
    }
}
