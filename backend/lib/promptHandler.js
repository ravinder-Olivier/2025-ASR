const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI
});

async function generateText(prompt, type) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            store: true,
            messages: [
                {"role": "user", "content": "what is the sun in 1 sentence"/*(prompt+"in the format of"+type)*/}
            ]
        });

        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content
    } catch (error) {
        console.error('Error:', error);
        return error
    }
}

async function promptHandler (prompt, type) {
    return await generateText(prompt,tester(type))
}

function tester (check) {
    if (check == 'true') {
        return true
    }
    else if (check == false) {
        return false
    }
    else {
        return false
    }

}

module.exports = promptHandler