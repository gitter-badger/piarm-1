/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import Gpio from '../gpio/gpio'
import Flux from '../flux/flux'

class api {

    /**
     * Add a listener for GPIO pin changes.
     * @param {function} cb - callback to be run when a pin changes.
     */
    addListener(cb) {
        gpio.register(cb);
    }

    /**
     * Remove a listener from GPIO pin changes.
     * @param {function} cb - callback to be removed.
     */
    removeListener(cb) {
        gpio.unRegister(cb)
    }

    /**
     * Read a specific channel.
     * @param channel - the channel to read. Can be either a string or a int.
     * @param {function} cb - callback that is run on a successful read, passes pin value as first argument
     */
    read(channel, cb) {
        gpio.read(channel, cb)
    }

    /**
     * Write to a specific channel.
     * @param {int} channel - the channel to write to. Can be either a string or a int.
     * @param {int} value - the value to write to the channel. (0 || 1)
     * @param {function} cb - an optional callback to be run on success.
     */
    write(channel, value, cb) {
        cb = cb || function () {
            };
        gpio.write(channel, value, cb)
    }

    /**
     * Get all configured channels.
     * @param {function} cb - an optional callback. Passes channels as first argument.
     * @returns {array} array of channels
     */
    getChannels(cb) {
        if (cb) {
            cb(Flux.getStore('channels').getState.channels)
        } else {
            return Flux.getStore('channels').getState.channels
        }
    }

    /**
     * Remove all configured channels.
     * @param {function} cb - an optional callback to be called on completion. err as first argument
     */
    destroyChannels(cb) {
        cb = cb || function () {
            };
        Flux.getActions('channels').destroy(cb);
    }

    /**
     * Remove a specific channel.
     * @param channel - the channel to be removed. Can be either a string or int.
     * @param {function} cb - optional callback that will be run on completion.
     */
    removeChannel(channel, cb) {
        cb = cb || function () {
            };
        Flux.getActions('channels').remove(channel, cb);
    }

    /**
     * Add a channel to the configuration.
     * @param {json} channel - The channel to add.
     * @param {function} cb - optional callback that will be run on completion.
     */
    addChannel(channel, cb) {
        cb = cb || function () {
            };
        Flux.getActions('channels').add(channel, cb);
    }

    /**
     * Get the configured user.
     * @param {function} cb - optional callback. Passes user as first argument.
     * @returns {json} user object
     */
    getUser(cb) {
        if (cb) {
            cb(Flux.getStore('users').getState.user)
        } else {
            return Flux.getStore('users').getState.user
        }
    }

    /**
     * Set the configured user
     * @param {json} user - the user obj
     * @param {function} cb - optional callback that is run on completion.
     */
    setUser(user, cb) {
        cb = cb || function () {
            };
        Flux.getActions('users').set(user, cb);
    }
}
const run = new api();
export default run;