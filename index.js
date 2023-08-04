const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { port } = process.env;

// const {openaiApiKey} = process.env

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: process.env.openaiApiKey,
// });

// const openai = new OpenAIApi(configuration);
// // console.log(openai)

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Quotes Generator");
})


app.get('/quotes', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        console.log(keyword)
        const prompt = `Quote about ${keyword}\n`
        const res = await axios.post('https://api.openai.com/v1/chat/completions', {
            prompt: {
                text: prompt,
                model: "text-davinci-002",
            },
            max_tokens: 100,
            temperature: 0.7,
            n: 1,
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": "Say this is a test!" }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        const quote = response.data.choices[0].text.trim();
        console.log(quote)
        // res.send({"Quote": quote})
        res.json({ quote });

    } catch (error) {
        console.error('Error:', error.response.data);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})