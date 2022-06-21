const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../db/models");
const bcrypt = require('bcrypt');
const {  validLogin } = require("../validations/user.validations");
const User = require("../db/models/user")(db.sequelize, db.Sequelize.DataTypes);

module.exports.loginHandler = async function (req) {
    try {

        const { error, value } = await validLogin(req);

        if (error) return {
            msg: 'Fields validation error',
            status: 400,
            error: error.message
        }

        let user = await User.findOne({
            where: {
                email: value.email
            }
        });

        if (!bcrypt.compareSync(req.body.password, user.password)) return { msg: 'Login Credentials Are InCorrect!', status: 400 };
        if (!user.toJSON().verified) return { msg: 'User Not Allowded To Login!', status: 400 };
        const accessToken = jwt.sign(user.toJSON(), config.secretkey, { expiresIn: "1h" });

        return {
            msg: 'User Logged In SucccessFully!',
            status: 200,
            accessToken: accessToken
        };

    } catch (error) {

        throw error

    }
}
