const path = require('path');

module.exports = {
    server: {
        stats: "errors-only",
        contentBase: path.join(__dirname, '/dist'),
        host: "127.0.0.1", // Defaults to `localhost`
        port: 9003, // Defaults to 8080
        open: true,
        compress: true,
        overlay: true,
        hot: true,
        writeToDisk: true
    },
};