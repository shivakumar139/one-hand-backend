import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import cors from "cors";
import errorHandler from "./services/errorHandler";

const app = express();
app.use(cors())

// database connection
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", ()=> console.log("error"));
db.once("open", ()=> console.log("connected"));

const appPort = process.env.App_PORT || APP_PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("home page");
})

app.use("/api/v1", routes)
app.use("/uploads", express.static("uploads"))



app.use(errorHandler)


app.listen(appPort, ()=> console.log(`Listening to port ${APP_PORT}`));