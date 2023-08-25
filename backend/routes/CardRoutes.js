const UserInfo = require('../models/UserInfo');

const router = require('express').Router();

router.post("/addcard", async(req,res)=>{
    const { id } = req.body;
    const user = await UserInfo.findById({_id:id});
    if(user){
        const cards = user?.cards;
        cards.unshift(req.body.values);
        await UserInfo.findOneAndUpdate({_id:id}, {$set: {cards: cards}} );
        res.status(200).json({message: `Card Added Successfully!`});
    }else{
        res.json({error: `User Not Found`});
    }
})

module.exports = router