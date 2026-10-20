import { NextRequest, NextResponse } from "next/server";

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

    // Формуємо рекламний промпт
    const fullPrompt = encodeURIComponent(
      `High-converting commercial advertisement banner for ${niche || "business"}. Main Subject: ${prompt}. Style: ${style || "Modern professional advertising design"}, studio lighting, 8k resolution`
    );

    // Визначення розмірів
    let width = 1024;
    let height = 1024;

    if (aspectRatio === "9:16") {
      width = 768;
      height = 1344;
    } else if (aspectRatio === "4:5") {
      width = 800;
      height = 1000;
    }

    // Випадкове число для унікальності картинок
    const seed = Math.floor(Math.random() * 1000000);

    // Безкоштовний URL від Pollinations із моделлю FLUX
    const imageUrl = `https://pollinations.ai/p/${fullPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;

    return NextResponse.json({ images: [imageUrl] });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Помилка при генерації зображення" },
      { status: 500 }
    );
  }
}