const CounterInfo = require("../models/CounterInfo")

const autoIncrementNumberId = async (req, res, next) => {
    try {
        const counter = await CounterInfo.findOneAndUpdate({ email: req.body.email }, { $inc: { value: 1 } }, { new: true });
        req.body.values.counter = counter.value;
        next();
    } catch (error) {
        res.json({ error: `Card Not Added! Try Again` });
    }
};

module.exports = autoIncrementNumberId;