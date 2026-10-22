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
        { error: "API-ключ REPLICATE_API_TOKEN не налаштовано на сервері." },
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

    if (image) {
      inputData.image = image;
    }

    // Запуск генерації в Replicate
    const output: any = await replicate.run("black-forest-labs/flux-schnell", {
      input: inputData,
    });

    // Отримуємо URL з результату
    let rawUrl = "";
    if (Array.isArray(output) && output.length > 0) {
      rawUrl = String(output[0]);
    } else if (typeof output === "string") {
      rawUrl = output;
    } else {
      rawUrl = String(output);
    }

    // Завантажуємо зображення на сервері та конвертуємо в Base64 (щоб обійти CORS і биті посилання)
    const imgResponse = await fetch(rawUrl);
    const arrayBuffer = await imgResponse.arrayBuffer();
    const base64Image = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

    return NextResponse.json({ images: [base64Image] });
  } catch (error: any) {
    console.error("Replicate API Error:", error);
    return NextResponse.json(
      { error: error.message || "Помилка при генерації креативу" },
      { status: 500 }
    );
  }
}