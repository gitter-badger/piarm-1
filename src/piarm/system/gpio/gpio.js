/*
 |--------------------------------------------------------------------------
 | Listens for Gpio interrupts and deals with them
 |--------------------------------------------------------------------------
 */

import gpio from 'rpi-gpio'
import Flux from '../flux/flux'
import logger from '../tools/logger'
import env from '../../env'

let log = logger.getLogger('[GPIO Module]');

class GPIO {

    constructor() {

        this.channels = [];
        this.callbacks = [];

        Flux.getStore('channels').on('change', this._channels);
        Flux.getActions('channels').fetch();
    }

    /**
     * Fetch all configured channels.
     * Initialize the pin setup
     */
    _channels = () => {
        let store = Flux.getStore('channels').getState;

        if (!store.error) {
            log.debug('fetched channels');
            this.channels = store.channels;
            this.setup()
        } else {
            log.error(store.error)
        }
    };

    /**
     * Register a callback to be run on a channel change
     */
    register(cb) {
        this.callbacks.push(cb)
    }

    /**
     * Remove the specified callback from the array
     */
    unRegister(cb) {
        this.callbacks.forEach((el, index) => {
            if (cb === el) {
                this.callbacks.splice(index, 1);
            }
        })
    }

    /**
     * Run all registered callbacks.
     * Emit event channel-name.
     * Emit event channel-number.
     *
     * @param {int} channel, channel that changed.
     * @param {int} value, current value of the changed channel.
     */
    broadcast = (channel, value) => {
        this.channels.forEach(obj => {
            if (obj.channel == channel) {
                log.debug('channel ' + obj.name + ':' + obj.channel + ' changed');

                this.callbacks.forEach(cb => cb(channel, value))
            }
        })
    };

    /**
     * Setup listeners for the configured channels
     */
    setup() {
        if (!env.mockGpio) {
            log.debug('setting up pins');

            /**
             * Remove all previous change listeners.
             * Start listening to change events.
             */
            gpio.removeListener('change', this.broadcast);
            gpio.on('change', this.broadcast);

            /**
             * Destroy all exported pins.
             * Set up configured channels.
             */
            gpio.destroy();
            this.channels.forEach(map => {
                gpio.setup(map.channel, map.direction, map.edge);
                log.debug('set up channel ' + map.channel + ' with dir,edge ' + map.direction + ',' + map.edge)
            });
        } else {
            log.debug('mocking gpio pin changes');
            this._mock()
        }
    }

    /**
     * Mock a pin change on the first configured channel every 3 seconds (if not on a pi)
     */
    _mock() {
        setTimeout(() => {
            this.broadcast(this.channels[0].channel, 1);
            process.nextTick(() => this._mock())
        }, 3000)
    }

    /**
     * Return the channel associated with a channel name.
     * @param channel - the channel name to parse.
     * @returns {int} the channel number.
     */
    _parseChannel(channel) {
        if (typeof channel === 'string') {
            this.channels.forEach((obj) => {
                if (obj.name == 'channel') {
                    return obj.channel
                }
            });
        } else {
            return channel;
        }
    }

    /**
     * Read a specific channel.
     * @param {int} channel, the channel to read.
     * @param {function} cb, callback that is run on a successful read, passes pin value as first argument
     */
    read(channel, cb) {
        channel = this._parseChannel(channel);
        if (!channel) return log.error('channel ' + channel + " doesn't exist");

        gpio.read(channel, (err, value) => {
            if (!err) {
                return cb(value);
            } else {
                log.error(err)
            }
        })
    }

    /**
     * Write to a specific channel.
     * @param {int} channel, the channel to write to.
     * @param {int} value, the value to write to the channel. (0 || 1)
     * @param {function} cb, an optional callback to be run on success.
     */
    write(channel, value, cb) {
        cb = cb || function () {
            };

        channel = this._parseChannel(channel);
        if (!channel) return log.error('channel ' + channel + " doesn't exist");

        gpio.write(channel, value, (err) => {
            if (!err) {
                return cb()
            } else {
                log.error(err)
            }
        })
    }
}
const run = new GPIO();
export default run;