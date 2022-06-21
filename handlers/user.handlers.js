const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../db/models");
const { validregister } = require("../validations/user.validations");
const User = require("../db/models/user")(db.sequelize, db.Sequelize.DataTypes);

module.exports.registrationHandler = async function (req) {
    try {

        req.body.role = "user";
        const { error, value } = await validregister(req);
        if (error) return {
            msg: 'Fields validation error',
            status: 400,
            error: error.message
        }
        let user = await User.create(value);
        const accessToken = jwt.sign(user.toJSON(), config.secretkey, { expiresIn: "1h" });

        return {
            status: 200,
            msg: "User Registered Successfully!",
            accessToken: accessToken
        };

    } catch (error) {

        throw error;

    }
}


module.exports.ProfileHandler = async function (req) {
    try {

        let user = await User.findOne({
            where: {
                id: req.loggedUser.id
            }
        });

        return {
            msg: 'User Profile Loaded SucccessFully!',
            status: 200,
            profile: user.toJSON()
        };

    } catch (error) {

        throw error
        
    }
}