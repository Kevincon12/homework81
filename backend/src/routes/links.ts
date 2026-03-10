import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    res.send("POST /links works");
});

router.get("/:shortUrl", async (req, res) => {
    res.send(`Redirect for ${req.params.shortUrl}`);
});

export default router;