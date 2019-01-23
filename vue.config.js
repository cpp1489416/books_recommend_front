
const path = require('path');

module.exports = {
    devServer: {
        port: 9999,
        https: false,
        hotOnly: false,
        proxy: {
            'bdapi/': {
                target: 'http://112.74.44.117/',
                pathRewrite: {
                }
            }
        }
    }
};
