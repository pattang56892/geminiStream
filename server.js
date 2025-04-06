import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_1_5_API_KEY);

app.use(express.static('public'));

// Store conversation history with the correct format
let conversationHistory = [];

wss.on('connection', async (socket) => {
  console.log('Client connected');

  // Function to handle user messages and generate responses
  async function handleMessage(text) {
    try {
      console.log('Received:', text);
      
      // Add user message to history
      conversationHistory.push({
        role: 'user',
        parts: [{ text: text }]
      });
      
      // Use the model we know works
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      // Generate a response
      console.log("Generating response...");
      const result = await model.generateContent({
        contents: conversationHistory,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });
      
      const response = result.response;
      const responseText = response.text();
      console.log("Generated response:", responseText.substring(0, 50) + "...");
      
      // Add response to history
      conversationHistory.push({
        role: 'model',
        parts: [{ text: responseText }]
      });
      
      // Send response to client
      socket.send(JSON.stringify({ type: 'response', text: responseText }));
    } catch (error) {
      console.error("Error generating response:", error);
      socket.send(JSON.stringify({ error: `Error generating response: ${error.message}` }));
    }
  }

  // Handle messages from frontend
  socket.on('message', async (data) => {
    const text = data.toString();
    await handleMessage(text);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
  
  // Send an initial welcome message
  setTimeout(() => {
    socket.send(JSON.stringify({ 
      type: 'response', 
      text: "Hello! I'm Gemini. You can start speaking by clicking the 'Start Speaking' button." 
    }));
  }, 1000);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});