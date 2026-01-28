const express = require("express");
const { connectDB } = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const cors = require('cors')

const app = express();
const PORT = 8001;

connectDB("mongodb+srv://ggarg6406_db_user:jdgk0WNY4kOCL8dO@cluster0.l7dzf79.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log("mongo DB connected");
        app.listen(PORT, () => {
            console.log(`app run at ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
// 
app.use(express.json());

app.use("/url", urlRoute);
app.get("/:id", async (req, res) => {
    const urlId = req.params.id;
    console.log('entry', urlId);
    try {
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
        if (entry) {
            res.redirect(entry.redirectUrl);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send("internal server error");
    }
})