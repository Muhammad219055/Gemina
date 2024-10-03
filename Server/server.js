const express = require('express');
const http = require('http');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
const genAI = new GoogleGenerativeAI('AIzaSyDNqHhaRBt4MhQO_y5livO5FP5DZEn41kU');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['POST'],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const server = http.createServer(app);

const PORT = 4000;

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      console.error('Error: No prompt provided');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Sending request to Google API with prompt:', prompt);

    const generatedResponse = await model.generateContent(prompt);

    console.log('Response from Google API:', generatedResponse.response.text());

    const candidates = generatedResponse.response.candidates;

    if (!candidates || candidates.length === 0) {
        console.error('Error: No candidates returned from API');
        return res.status(500).json({ error: 'Failed to generate content' });
      }

      res.status(200).json(generatedResponse.response.text()); 
  } catch (error) {
    console.error('Error while calling Google API:', error.message || error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});