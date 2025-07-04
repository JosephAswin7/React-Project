export const sendMessageToAI = async (message) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error("🚨 OpenRouter API key is missing. Please check your .env file.");
    return "Sorry, OpenRouter API key is not configured.";
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
  "HTTP-Referer": "http://localhost:5173",
  "X-Title": "ShopEase AI Assistant"
},
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: "You are a helpful shopping assistant."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });


    const data = await response.json();

if (!data.choices || !data.choices[0]) {
  console.error("Unexpected OpenRouter response:", data);
  return "Sorry, no valid response from AI.";
}

return data.choices[0].message.content;


  } catch (error) {
    console.error("OpenRouter Error:", error);
    return "Sorry, I’m having trouble responding right now.";
  }
};
