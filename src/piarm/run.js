/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

require("babel/register")(
    {
        stage: 0,
        optional: 'runtime'
    }
);

require('./system/piarm');