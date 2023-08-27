const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, default: "" },
    cards: [
        {
            seller: { type: String },
            buyer: { type: String },
            sellingDate: { type: String },
            dueDate: { type: String },
            dueDay: { type: String },
            weight: { type: String },
            outPercentage: { type: String },
            outWeight: { type: String },
            netWeight: { type: String },
            price: { type: String },
            lessPercentage: { type: String },
            totalAmount: { type: String },
            brokerage: { type: String },
            brokerageAmt: { type: String },
            pendingAmount: { type: String },
            paidDate: { type: String },
            paidAmount: { type: Number },
            paymentRemarks: [
                {
                    Date: { type: String },
                    PaidAmount: { type: Number },
                    fullpaymentDone: { type: Boolean }
                }
            ],
            fullpaymentDone: { type: Boolean },
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model('UserInfo', UserInfo);