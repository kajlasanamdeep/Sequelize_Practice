const { getUsersHandler,verifyUserHandler } = require("../handlers/admin.handlers");

module.exports.getUsers = async function(req,res) {
    const data = await getUsersHandler(req);
    res.status(data.status).send(data);
}

module.exports.verifyUser = async function(req,res) {
    const data = await verifyUserHandler(req);
    res.status(data.status).send(data);
}