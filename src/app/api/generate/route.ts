import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, aspectRatio, niche, style } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Введіть опис для рекламного креативу" },
        { status: 400 }
      );
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "API-ключ REPLICATE_API_TOKEN не налаштовано." },
        { status: 500 }
      );
    }

    const adPrompt = `High-converting commercial advertisement banner for ${niche || "business"}. Main Subject: ${prompt}. Style: ${style || "Modern"}, studio lighting, 8k resolution, highly detailed, photorealistic.`;

    let aspect_ratio = "1:1";
    if (aspectRatio === "9:16") aspect_ratio = "9:16";
    if (aspectRatio === "4:5") aspect_ratio = "4:5";
    if (aspectRatio === "1.91:1") aspect_ratio = "16:9";

    // Строго передаємо лише текст і формат (без несумісного параметра image)
    const output: any = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: adPrompt,
        aspect_ratio: aspect_ratio,
        output_format: "png",
        output_quality: 95,
      },
    });

    // Універсальний парсер (підтримує будь-яку версію SDK від Replicate)
    let finalUrl = "";
    const firstOutput = Array.isArray(output) ? output[0] : output;

    if (firstOutput) {
      if (typeof firstOutput === "string") {
        finalUrl = firstOutput;
      } else if (typeof firstOutput.url === "function") {
        finalUrl = firstOutput.url();
      } else if (firstOutput.url) {
        finalUrl = firstOutput.url;
      } else {
        finalUrl = String(firstOutput);
      }
    }

    if (!finalUrl || finalUrl === "null" || finalUrl === "undefined") {
      throw new Error(`Помилка API. Replicate повернув: ${JSON.stringify(output)}`);
    }

    return NextResponse.json({ images: [finalUrl] });
  } catch (error: any) {
    console.error("Replicate API Error:", error);
    return NextResponse.json(
      { error: error.message || "Помилка при генерації креативу" },
      { status: 500 }
    );
  }
}