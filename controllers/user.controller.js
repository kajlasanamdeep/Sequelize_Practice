const handlers = require('../handlers/user.handlers');

async function register(req, res) {

    const data = await handlers.registrationHandler(req);
    res.status(data.status).send(data);
    
};

async function getProfile(req,res) {

    const data = await handlers.ProfileHandler(req);
    res.status(data.status).send(data);

};

module.exports = {
    register: register,
    getProfile:getProfile
}