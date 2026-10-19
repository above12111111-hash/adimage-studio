import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt, aspectRatio } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Промт обовʼязковий' }, { status: 400 });
    }

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          aspect_ratio: aspectRatio || "1:1",
          output_format: "webp",
          output_quality: 90
        }
      }
    );

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Помилка генерації' }, { status: 500 });
  }
}