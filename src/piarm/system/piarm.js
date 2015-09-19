/*
 |--------------------------------------------------------------------------
 | Run file
 |--------------------------------------------------------------------------
 **/

import logger from './tools/logger'
import fs from 'fs'
import path from 'path'
import socket from './sockets/client/client'
import gpio from './gpio/gpio'

let log = logger.getLogger('[RUN]');

class Piarm {

    constructor() {

        this.modules = [];
        this.initializeModules();
        this._events()
    }

    /**
     * Filter through the modules directory and initialize all modules found
     */
    initializeModules() {
        fs.readdir(path.join(__dirname, 'modules'), (err, files) => {
            if (!err) {
                files.forEach(file => {
                    let dir = path.join(__dirname, 'modules', file);
                    if (fs.lstatSync(dir).isDirectory()) {
                        fs.readFile(path.join(dir, 'package.json'), 'utf8', (err, data) => {
                            if (!err) {
                                data = JSON.parse(data);

                                if (data.main && data.main != '') {
                                    let module = path.join(dir, data.main);
                                    if (fs.lstatSync(module)) {
                                        log.debug('initializing module [' + file + ']');

                                        let run = require(module);
                                        run = new run();

                                        let hash = {
                                            name: file,
                                            module: run,
                                            root: dir,
                                            main: module
                                        };
                                        this.modules.push(hash);

                                        run.api = require('./api/api');
                                        run.log = logger.getLogger('[' + file + ' module]');
                                        run.init();
                                    } else {
                                        log.info(module + ' Does not map to a valid module. Cannot initialize [' + file + ']')
                                    }
                                }
                            } else {
                                log.error(err)
                            }
                        })
                    }
                });
            } else {
                log.error(err)
            }
        });
    }

    /**
     *
     * @param hook
     * @param params
     * @private
     */
    _triggerModuleHook = (hook, ...params) => {
        this.modules.forEach(module => {
            if (typeof module.module[hook] === 'function') {
                module.module[hook](...params)
            }
        })
    };

    _events() {
        gpio.register(this._triggerModuleHook.bind(this, 'channelChanged'));

        socket.on('auth', this._triggerModuleHook.bind(this, 'socketWasAuthorized'))
    }
}

const run = new Piarm();
export default run;