# Gemini Stream

A streaming interface for Gemini API.

## Description

This application is a real-time chat interface that connects a web frontend to the Gemini 1.5 Pro AI model from Google. It uses Express.js to serve static content, creates an HTTP server, and establishes WebSocket connections for real-time communication. When a client connects, they receive a welcome message. The server maintains a conversation history to provide context for each interaction. When a user sends a message, it's added to the history, sent to the Gemini API, and the response is then returned to the client through the WebSocket connection and also stored in the conversation history.

The application is designed to handle speech input, as evidenced by the welcome message mentioning a "Start Speaking" button,

It also interfaces with speech recognition functionality on the frontend.

## Installation

```bash
npm install

npm start

License
MIT License
Copyright (c) 2025
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


```
