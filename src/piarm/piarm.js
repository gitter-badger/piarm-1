/*
 |--------------------------------------------------------------------------
 | Run file
 |--------------------------------------------------------------------------
 **/

import logger from './system/tools/logger'
import fs from 'fs'
import path from 'path'
import socket from './system/sockets/client'

let log = logger.getLogger('[Initialize]');

class Piarm {

    constructor() {

        this.modules = [];
        this.run();
    }

    run() {

        this.initializeModules();
    }

    /**
     * Filter through the modules directory and initialize all modules found
     */
    initializeModules() {
        fs.readdir(path.join(__dirname, 'system/modules'), (err, files) => {
            if (!err) {
                files.forEach(file => {
                    let dir = path.join(__dirname, 'system/modules', file);
                    if (fs.lstatSync(dir).isDirectory()) {
                        fs.readFile(path.join(dir, 'package.json'), 'utf8', (err, data) => {
                            if (!err) {
                                data = JSON.parse(data);

                                if (data.main && data.main != '') {
                                    log.debug('initializing module [' + file + ']');
                                    this.modules.push({
                                        module: file,
                                        dir: dir,
                                        main: path.join(dir, data.main)
                                    });

                                    // First check that they are registered online
                                    require(path.join(dir, data.main))
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
}

new Piarm();