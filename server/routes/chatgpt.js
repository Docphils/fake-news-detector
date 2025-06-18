const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
    const {message} = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini-2024-07-18",
                messages: [
                    {
                        role: "system",
                        content:
                            "You're a misinformation analyst. Analyze messages for fake news.",
                    },
                    {
                        role: "user",
                        content: `You're a fake news analyst. Analyze messages for misinformation. 
                        Respond ONLY in valid JSON with this structure:

                        {
                        "score": number (0-100),
                        "redFlags": [ "reason1", "reason2", "reason3" ],
                        "advice": "string",
                        "qouteAboutFacts": "string"
                        }

                        Now analyze this message:
                        "${message}"`,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({success: true, reply});
    } catch (err) {
        console.error("OpenAI API Error:", err.response?.data || err.message);
        res.status(500).json({
            error: "Something went wrong with the AI request",
            details: err.response?.data || err.message,
        });
    }
});

module.exports = router;
