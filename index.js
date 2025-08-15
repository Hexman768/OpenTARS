const readline = require('readline');
const OpenAI = require('openai');

const API_KEY = 'API_KEY_HERE';

const ai = new OpenAI({
  apiKey: API_KEY,
});

async function getAIResponse(prompt) {
  try {
    const completion = await ai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: "developer", content: prompt }],
      store: true,
    });
    //return completion.choices[0].message.content;
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting OpenAI response: ', error);
    return 'An Error Occurred.';
  }
}

async function main() {
  let prompt = '';
  const userPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  userPrompt.question('Ask TARS: ', (question) => {
    prompt = question;
    userPrompt.close();
  });
  const assistantResponse = await getAIResponse(prompt);
  console.log(`TARS: ${assistantResponse}`);
}

main();

