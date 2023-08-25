const bcrypt = require('bcrypt');

const HashPassword = async (req, res, next) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password, 10);
        next();
    }catch(err){
        res.status(500).json({error : "Error In HashPassword"});
    }
}

module.exports = HashPassword;