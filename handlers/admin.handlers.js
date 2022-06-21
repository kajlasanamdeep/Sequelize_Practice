const db = require("../db/models");
const User = require("../db/models/user")(db.sequelize, db.Sequelize.DataTypes);

module.exports.getUsersHandler = async function (req) {
    try {
        if (req.loggedUser.role == "admin") {

            let Users = await User.findAll();

            const unverifiedUsers = Users.filter((user) => {
                return !user.verified
            });

            const verifiedUsers = Users.filter((user) => {
                return user.verified
            });

            if (req.params.getUsers == "getUnVerifiedUsers")
                return {
                    status: 200,
                    msg: 'UnVerified users are listed below!',
                    unverifiedUsers: unverifiedUsers
                };


            else if (req.params.getUsers == "getVerifiedUsers")
                return {
                    status: 200,
                    msg: 'Verified users are listed below!',
                    verifiedUsers: verifiedUsers
                };
        }
        else {

            return {
                status: 400,
                msg: "You Are Not Authorized To Access This Page!"
            };

        }
    } catch (error) {

        throw error;

    }
}

module.exports.verifyUserHandler = async function (req) {
    try {

        if (req.loggedUser.role == "admin") {

            let userId = req.body.userId;

            if(!userId) return{
                status:400,
                msg:"user not found!"
            }

            await User.update({verified:true},{
                where:{
                    id:userId
                }
            });

            let updatedUser = await User.findOne({where:{id:userId}});

            return {
                status:200,
                msg: "user verified successfully!",
                updatedUser: updatedUser
            };

        }

        else {

            return {
                status:400,
                msg: "You Are Not Authorized To Access This Page!"
            };

        }

    } catch (error) {

        throw error;

    }

}