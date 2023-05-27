require('dotenv').config()

const express = require('express');
const app = express();
const openai = require('./openai')

app.get('/', async (request, response) => {
    return response.send(
        
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Say this is a test",
            max_tokens: 7,
            temperature: 0,
          })          
    );
});

app.listen(5000, () => {
    console.log('App is listening on port 5000');
});