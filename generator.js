const express = require('express');
const fetch = require('node-fetch-commonjs'); // Ensure you have node-fetch installed
const app = express();
const port = 3001; // Use a different port to avoid conflicts with your main server
const cors = require('cors');

app.use(cors()); 
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/generate', async (req, res) => {
    const textInput = req.body.inputs;

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer hugging-face-tocken',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: textInput
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.buffer(); // Use buffer() for Node.js
        res.send({ imageUrl: `data:image/png;base64,${blob.toString('base64')}` });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).send({ error: 'Failed to generate image' });
    }
});

app.listen(port, () => {
    console.log(`Generator server running at http://localhost:${port}/`);
});
