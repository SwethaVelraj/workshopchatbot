import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ",messages)
  //TODO TASK 1
  const systemPrompt = `You are a friendly college companion who helps students interact professionally, prepare confidently for viva and presentations, and avoid common academic mistakes by turning professor expectations and academic communication into clear, practical guidance, using a respectful, supportive, lightly humorous, stress-relieving tone
  following is the context:
  `

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}

