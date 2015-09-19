/*
 |--------------------------------------------------------------------------
 | Mock system state data that is stored locally
 |--------------------------------------------------------------------------
 **/

module.exports.mock = function (type) {

    switch (type) {
        case 'user':
            return user();
            break;
        case 'channels':
            return channels();
            break;
        default:
            return {}
    }
};

function user() {

    return {
        user: {
            email: 'johndoe@gmail.com',
            secret: 'kjsnedfhijn34jn5jk3njplm345lkasd23'
        }
    }
}

function channels() {

    return {
        channels: [
            {
                name: 'channel3',
                channel: 3,
                direction: 'in',
                edge: 'both'
            },
            {
                name: 'channel5',
                channel: 5,
                direction: 'in',
                edge: 'both'
            }
        ]
    }
}