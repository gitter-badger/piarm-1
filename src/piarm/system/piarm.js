/*
 |--------------------------------------------------------------------------
 | Run file
 |--------------------------------------------------------------------------
 **/

import logger from './tools/logger'
import fs from 'fs'
import path from 'path'
import socket from './sockets/client/client'

let log = logger.getLogger('[RUN]');

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
                                        let hash = {
                                            module: file,
                                            dir: dir,
                                            main: module
                                        };
                                        this.modules.push(hash);

                                        let run = require(module);
                                        new run({
                                            hash: hash,
                                            api: require('./api/api'),
                                            logger: logger.getLogger('[' + file.toUpperCase() + ' Module]')
                                        });
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
}

const run = new Piarm();
export default run;