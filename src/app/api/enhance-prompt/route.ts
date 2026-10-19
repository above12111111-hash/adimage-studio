import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { prompt, niche } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemInstruction = `You are an expert AI prompt engineer for Facebook & Instagram ad creatives. Convert the user's input into a highly detailed, photorealistic, cinematic prompt in English suitable for image generation models (like Flux or Midjourney). Niche: ${niche || 'General'}. Return ONLY the expanded prompt in English, nothing else.`;

    const result = await model.generateContent([systemInstruction, prompt]);
    const enhancedPrompt = result.response.text();

    return NextResponse.json({ enhancedPrompt });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Помилка Gemini API' }, { status: 500 });
  }
}