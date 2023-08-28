const UserInfo = require('../models/UserInfo');

const router = require('express').Router();

router.post("/addcard", async (req, res) => {
    const { user_id, values } = req.body;
    try {
        const user = await UserInfo.findById(user_id);
        if (user) {
            let cards = user.cards;
            cards.unshift(values);
            const response = await UserInfo.findOneAndUpdate({ _id: user_id }, {
                $set: {
                    cards: cards,
                }
            });
            if (response)
                res.status(200).json({ message: `Card Added Successfully!` });
        }
    }
    catch (e) {
        res.json({ error: `Card Not Added! Try Again` });
        console.log(e);
    }
})

router.post("/updatecard", async (req, res) => {
    const { userid, cardid, values } = req.body;
    console.log("Values--->", values);
    
    const updated = await UserInfo.findOneAndUpdate({ _id: userid, 'cards._id': cardid },
        { returnOriginal: false }
    );

    if (updated && Object.keys(updated).length > 0) {
        res.status(200).json({ user: updated, message: `Card Updated Successfully!` });
    }
    else {
        res.json({ error: `Card Not Updated! Try Again` });
    }
})


module.exports = router