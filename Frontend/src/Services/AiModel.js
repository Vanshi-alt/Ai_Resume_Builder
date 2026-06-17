export const generateAI = async (prompt) => {
  try {
     console.log("AI MODEL GOT:", prompt);
    const res = await fetch("http://localhost:5001/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });


    if (!res.ok) {
      throw new Error("Failed to generate AI response");
    }

    const data = await res.json();


    if (!data.success) {
      throw new Error(data.error || "Something went wrong");
    }

    return data.result;
  } catch (error) {
    console.error("Frontend AI Error:", error.message);

    // component ko error bhej do
    throw error;
  }
};