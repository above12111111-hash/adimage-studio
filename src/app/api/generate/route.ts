import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, aspectRatio, niche, style, image } = body;

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

    const adPrompt = `High-converting commercial advertisement banner for ${niche || "business"}. Main Subject: ${prompt}. Style: ${style || "Modern professional advertising design"}, studio lighting, 8k resolution, highly detailed, photorealistic.`;

    let aspect_ratio = "1:1";
    if (aspectRatio === "9:16") aspect_ratio = "9:16";
    if (aspectRatio === "4:5") aspect_ratio = "4:5";
    if (aspectRatio === "1.91:1") aspect_ratio = "16:9";

    const inputData: any = {
      prompt: adPrompt,
      aspect_ratio: aspect_ratio,
      output_format: "png",
      output_quality: 95,
    };

    // Якщо користувач завантажив референс, додаємо його до запиту
    if (image) {
      inputData.image = image;
    }

    const output: any = await replicate.run("black-forest-labs/flux-schnell", {
      input: inputData,
    });

    // БЕЗПЕЧНЕ ВИЛУЧЕННЯ URL (підтримує і старі, і нові версії Replicate)
    let finalUrl = "";
    
    if (Array.isArray(output) && output.length > 0) {
      // Якщо це об'єкт потоку, викликаємо функцію .url()
      finalUrl = typeof output[0].url === "function" ? output[0].url() : String(output[0]);
    } else if (typeof output === "string") {
      finalUrl = output;
    } else if (output && output.url) {
      finalUrl = typeof output.url === "function" ? output.url() : String(output.url);
    }

    if (!finalUrl || finalUrl === "null" || finalUrl === "undefined") {
      throw new Error("Не вдалося отримати коректне посилання на фото від Replicate.");
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