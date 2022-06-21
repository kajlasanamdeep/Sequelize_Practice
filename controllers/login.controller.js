const handlers = require('../handlers/login.handler');


module.exports.login = async function(req, res) {

    const data = await handlers.loginHandler(req);
    res.status(data.status).send(data);

};