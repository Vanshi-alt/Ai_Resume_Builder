import axios from "axios";

export const generateResume = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    const { prompt } = req.body;
    console.log("PROMPT:", prompt);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer"
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const result = response.data.choices[0].message.content;

    res.json({
      success: true,
      result
    });

  } catch (error) {
  console.log(
    "FULL GROQ ERROR:",
    error.response?.data || error.message
  );

  res.status(500).json({
    success: false,
    error: error.response?.data || error.message
  });
}
};