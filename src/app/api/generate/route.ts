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
        { error: "API-ключ REPLICATE_API_TOKEN не налаштовано на сервері." },
        { status: 500 }
      );
    }

    // Формуємо спеціальний рекламний промпт для нейромережі
    const adPrompt = `High-converting commercial advertisement banner for ${niche || "business"}. 
    Main Subject: ${prompt}. 
    Style: ${style || "Modern professional advertising design"}, studio lighting, 8k resolution, graphic design layout with space for text, catchy promotional visual, Instagram & Facebook ad template, highly detailed.`;

    let aspect_ratio = "1:1";
    if (aspectRatio === "9:16") aspect_ratio = "9:16";
    if (aspectRatio === "4:5") aspect_ratio = "4:5";

    // Запуск нейромережі Flux
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: adPrompt,
          aspect_ratio: aspect_ratio,
          output_format: "png",
          output_quality: 95,
        }
      }
    );

    const imageUrls = Array.isArray(output) ? output : [output];

    return NextResponse.json({ images: imageUrls });
  } catch (error: any) {
    console.error("Replicate API Error:", error);
    return NextResponse.json(
      { error: error.message || "Помилка при генерації креативу" },
      { status: 500 }
    );
  }
}