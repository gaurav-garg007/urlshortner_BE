const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    history: [
        {
            clicks: {
                type: Number
            }
        }
    ]
}, { timestamps: true });

const URL = mongoose.model("urls", urlSchema);

module.exports = URL;