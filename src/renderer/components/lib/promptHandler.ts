/*
Copyright 2025 Ravinder Olivier Singh Dadiala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import OpenAI from 'openai';


export default async function promptHandler (prompt:string) {
    const client = new OpenAI({
        apiKey: process.env.OPENAI,
        dangerouslyAllowBrowser: true
        // This is the default and can be omitted
    });

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
    });
}
