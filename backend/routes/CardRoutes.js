const UserInfo = require('../models/UserInfo');

const router = require('express').Router();

router.post("/addcard", async(req,res)=>{
    const {user} = req.body;
    try{
        console.log(user.cards);
        await UserInfo.findOneAndUpdate({ _id: user._id },{ $set: { cards: user.cards } });
        res.status(200).json({message: `Card Added Successfully!`});
    }
    catch(e){
        res.json({error: `Card Not Added! Try Again`});
        console.log(e);
    }
})

router.post("/updatecard", async(req,res)=>{
    
})

module.exports = router