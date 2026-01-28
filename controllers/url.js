const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function createShortUrl(req, res){
    const body = req.body;
    const urlId = nanoid(5);

    try{

        if(!body.url) return res.status(400).json({message: "url is requires"})
        await URL.create({
            redirectUrl: body.url,
            urlId,
            history: []
        });

        return res.status(200).json({
            message: "url saved",
            url: urlId
        })
    } catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

async function getAnalytics(req, res){
    const urlId = req.params.id;
    console.log('sd', urlId);
    try{
        let urlInfo = await URL.findOne({ urlId });
        return res.status(200).json({
            totalClicks: urlInfo.history.length,
            clickHistory: urlInfo.history
        });
    } catch(error){
        return res.status(500).send("internal server error");
    }
}

module.exports = {
    createShortUrl,
    getAnalytics
}