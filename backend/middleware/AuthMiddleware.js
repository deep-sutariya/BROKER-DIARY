const jwt = require('jsonwebtoken');
const UserInfo = require('../models/UserInfo');

const AuthMiddleware = async (req, res, next) => {
    try {
        if (req.body.token && req.body.token.length > 0) {
            const { user } = jwt.verify(req.body.token, process.env.TOCKEN_PRIVATE_KEY);
            console.log(user);
            const userInfo = await UserInfo.findById({ _id: user });
            res.status(200).json({user:userInfo,message: `Welcome Back ${userInfo.name}`});
        }
        else {
            next();
        }
    } catch (err) {
        res.json({ error: "Error In Authentication" });
    }
}

module.exports = AuthMiddleware;