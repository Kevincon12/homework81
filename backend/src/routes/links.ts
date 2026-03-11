import express from "express";
import {customAlphabet} from "nanoid";
import Link from "../models/Link";

const router = express.Router();

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 6);

router.post("/", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL doesn't exist" });
    }

    const shortUrl = nanoid();

    try {
        const newLink = new Link({
            originalUrl: url,
            shortUrl: shortUrl
        });

        await newLink.save();

        res.json({
            id: newLink._id,
            shortUrl: newLink.shortUrl,
            originalUrl: newLink.originalUrl
        });
    } catch (error) {
        res.status(500).json({ error: "Error saving to database" });
    }
});

router.get("/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const link = await Link.findOne({ shortUrl });

        if (!link) {
            return res.status(404).json({ error: "Link not found" });
        }

        res.redirect(301, link.originalUrl);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;