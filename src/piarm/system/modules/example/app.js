/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

export default
class Example {

    init() {

    }

    channelChanged(channel, value) {
        this.log.info('channel ' + channel + ' changed')
    }

    socketWasAuthorized(socket) {
        this.api.removeChannel(3, (err) => {
            if (err) return this.log.error(err)

            this.log.info('channel was removed')
        })
    }
}
