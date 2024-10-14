// openaiStream.ts
'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { fetchWebpageContent } from '@/utils/extractor';

export async function generate(query: string, url: string) {
  const webpageContent = await fetchWebpageContent(url);

  const systemPrompt = `
You are an AI assistant designed to analyze web content from webpages and respond to user queries. When given a user query and webpage content, follow these rules:
1. Generate a concise response (limited to 100-200 words) that directly answers the query, using any relevant code blocks from the webpage if appropriate.
2. Only use code blocks that are already present in the webpage and only for code snippets.
3. If no specific intent is recognized, provide a brief summary of the webpage content.
Keep your responses precise and within the 200-word limit.
  `;

  const userPrompt = `
Webpage Content: ${webpageContent}
User Query: ${query}

Generate a concise snippet (within 100-200 words) that best answers the user's query. 
If the webpage contains relevant code blocks, include them in your response. 
Only use code blocks that are present in the webpage content. 
If no specific intent is recognized from the query, provide a brief summary of the page.
  `;

  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o-mini'), // or 'gpt-3.5-turbo' depending on your preference
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();

  return { output: stream.value };
}