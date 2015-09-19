/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import api from '../../api/api'
import logger from '../../tools/logger'

let log = logger.getLogger('[Example Module]');

class Example {

    constructor() {

        this.run();
    }

    run() {
        api.addListener((channel, value) => {
            log.info('channel ' + channel + ' changed to ' + value);
        })
    }
}

new Example();