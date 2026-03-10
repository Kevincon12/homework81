import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import linksRouter from "./routes/links";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/links", linksRouter);

mongoose.connect("mongodb://127.0.0.1:27017/url-shortener");

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});