const sequelize = require('./db/models').sequelize;
const app = require('./app');
const http = require('http');
const config = require('./config/config');
const server = http.createServer(app);

sequelize.sync();

sequelize.authenticate().then(function () {

    console.log('DB connection has been established successfully.');

}).catch(function (err) {

    throw Error('Unable to connect to the database\nPlz Check Your Connection and Try Again');

});

server.listen(config.port, () => {
    console.log(`App is running at http://localhost:${config.port}/`);
});