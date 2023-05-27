require('dotenv').config()

const express = require('express');
const app = express();
const openai = require('./openai')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', async (request, response) => {
    return response.send(await openai.listModels().then(response => {
        return response.data
    }))
});

app.post("/code/comment", async (request, response) => {
    return response.send(
        await openai.createEdit({
            model: "code-davinci-edit-001",
            input: request.body.code,
            temperature: 0.5,
            instruction: "Comment the code with the next standards descriptive comments, function or method level comments, line level comments, avoid necessary comments"
        }).then(response => {
            return response.data.choices[0].text
        })
    )
})

app.post("/code/unit_test_cases", async (request, response) => {
    return response.send(
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `create the unit test cases for the next code:${request.body.code}`,
            temperature: 0.5,
            top_p: 0.9,
            max_tokens: 500
        }).then(async response => {
            return response.data.choices[0].text
        })
    )
})

app.listen(5000, () => {
    console.log('App is listening on port 5000');
});