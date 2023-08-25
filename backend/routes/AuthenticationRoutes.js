const router = require('express').Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const HashPassword = require('../middleware/HashPassword');
const UserInfo = require('../models/UserInfo')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post("/login", AuthMiddleware, async (req, res) => {
    const { email, password } = req.body;
    const user = await UserInfo.findOne({ email });
    if (user) {
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign({user : user._id}, process.env.TOCKEN_PRIVATE_KEY,{expiresIn: '500s'});
            console.log(token)
            await UserInfo.findOneAndUpdate({email},{token});

            res.status(200).json({user,token,message:"You Logged In Successfully!"});
        }
        else {
            res.json({ error: "Wrong Password!" });
        }
    }
    else {
        res.json({ error: "Email Already Exists" });
    }
});

router.post("/signup", HashPassword, async (req, res) => {
    const { email } = req.body;

    const isExists = await UserInfo.findOne({ email });
    if (isExists) res.send({ error: "Email Already Exists" });
    else {
        const user = new UserInfo(req.body);
        await user.save();

        res.status(200).json({ message: "You are Registered Successfully!" });
    }
});

module.exports = router;