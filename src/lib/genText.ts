import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI
});

 openai
export default async function generateText(prompt: string, type: boolean) {
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
