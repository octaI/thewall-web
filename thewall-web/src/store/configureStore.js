if (process.env.NODE_ENV === 'production' || (window.location && window.location.hostname !== 'localhost')) {
    module.exports = require('./configurestore.prod');
} else {
    module.exports = require('./configurestore.dev');
}