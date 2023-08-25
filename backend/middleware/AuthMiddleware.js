const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
    try{
        console.log(req.body.token);
        if(req.body.token.length > 0){
            try{
                console.log(jwt.verify(token,process.env.TOCKEN_PRIVATE_KEY));
            }
            catch(e){
                console.log("E->",e);
            }
        }
        next();
    }catch(err){
        res.status(500).json({error : "Error In Authentication"});
    }
}

module.exports = AuthMiddleware;