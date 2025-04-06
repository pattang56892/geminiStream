import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Log the API key
console.log("API Key:", process.env.GOOGLE_GEMINI_1_5_API_KEY);

async function testGeminiAPI() {
  try {
    // Create the API client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_1_5_API_KEY);
    
    // Try with different model variations
    const models = [
      'gemini-1.5-pro',
      'gemini-1.0-pro',
      'gemini-pro'
    ];
    
    for (const modelName of models) {
      console.log(`Testing model: ${modelName}`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Simple non-streaming test
        const result = await model.generateContent("Hello, how are you?");
        console.log(`Success with ${modelName}:`, result.response.text());
        console.log("--------------------");
      } catch (modelError) {
        console.error(`Error with ${modelName}:`, modelError.message);
        console.log("--------------------");
      }
    }
  } catch (error) {
    console.error("General API error:", error);
  }
}

testGeminiAPI();