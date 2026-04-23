import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      process.env.VITE_AI_API_URL, // from .env
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VITE_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: error.response.data.error.message,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

console.log("AI Key Loaded:", !!process.env.VITE_AI_API_KEY);

export default router;
