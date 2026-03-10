import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
});

const Link = mongoose.model("Link", LinkSchema);

export default Link;