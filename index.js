const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())


// this is for integrating openAi with node.js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);



app.get('/', (req, res) => {
    res.send({ "hello": "Welcome to Quotes Generator" });
})


app.get("/generateChat", async (req, res) => {
    const keyword = req.body.keyword;

    try {
        const generatedChat = await generateCompletion(keyword);
        res.status(200).json({ generatedChat });
        // res.send(generatedChat)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: 'An error occurred while generating chat completion.' });
    }
})


async function generateCompletion(prompt) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 1,
        });

        const chat = completion.data.choices[0].text.trim();
        // console.log(chat)
        return chat;
    } catch (error) {
        // console.error('Error:', error.response.data);
        return { error: 'Something went wrong' }
    }
}


app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`)
})



