const Joi = require("joi");

module.exports.validregister = async function(req) {

    const userSchema = Joi.object().keys({
        firstName:Joi.string().optional().trim().max(15),
        lastName:Joi.string().optional().trim().max(15),
        email:Joi.string().email().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().lowercase(),
        password:Joi.string().required().min(6).max(12).pattern(/(?=.*[0-9])/).pattern(/(?=.*[A-Z])/).pattern(/(?=.*[a-z])/).pattern(/(?=.*[@#$%^&-+=()])/),
        role:Joi.string().valid('user','admin')
    });

    return userSchema.validate(req.body);
}

module.exports.validLogin = async function(req) {
    
    const userSchema = Joi.object().keys({
        email:Joi.string().email().required().lowercase(),
        password:Joi.string().required().min(6).max(12)
    });

    return userSchema.validate(req.body);
}