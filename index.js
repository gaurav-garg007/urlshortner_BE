const express = require("express");
const { connectDB } = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();

const app = express();

connectDB(process.env.MONGOURL)
    .then(()=>{ console.log(" mongo DB connected")} );

app.listen(process.env.PORT,()=>{
    console.log(`app run at ${process.env.PORT}`);
})

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use("/url", urlRoute);
app.get("/:id", async (req, res)=> {
    const urlId = req.params.id;
    console.log('entry', urlId);
    try{
        const entry = await URL.findOneAndUpdate(
            { urlId },
            {
                $push: {
                    history: {
                        clicks: Date.now()
                    }
                }
            }
        )
        res.redirect(entry.redirectUrl);
    } catch(error){
        console.log('error', error);
        return res.status(500).send("internal server error");
    }
})