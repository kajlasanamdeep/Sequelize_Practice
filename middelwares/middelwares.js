
const jwt = require("jsonwebtoken");
const db = require("../db/models");
const User = require("../db/models/user")(db.sequelize, db.Sequelize.DataTypes);

module.exports.checkDuplicate = async function (req, res, next) {
    try {
        const { email } = req.body;
        let existingUser = await User.findOne({
            where: {
                email: email
            }
        });
        if (existingUser) {
            res.status(400).send({ msg: 'Email Already In Use!', data: {} });
        }
        else {
            next()
        }
    } catch (error) {

        throw error;

    }
}

module.exports.loginWithToken = async function (req, res, next) {
    try {
        if (req.headers.authorization) {

            let accessToken = req.headers.authorization;

            if (accessToken.startsWith('Bearer')) {
                [, accessToken] = accessToken.split(' ');
            }
            try {
                let decodedData = jwt.decode(accessToken);
                if (decodedData.verified) {
                    req.loggedUser = decodedData;
                    next();
                }
                else {
                    res.status(400).send({ msg: "You Are Allowded To Login!" });
                }
            }
            catch (error) {
                res.status(400).send({ msg: "Login Session Expired Plz login Again!" })
            }
        }
        else {
            res.status(400).send({ msg: "UnAuthorized Access!" })
        }
    }
    catch (error) {

        throw error;
        
    }
} 
