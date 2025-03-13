import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
})

export async function POST(req: Request) {
    try {
      const { messages } = await req.json();
      const completion = await openai.chat.completions.create({
        messages, // mengirimkan keseluruhan riwayat pesan
        model: "deepseek-chat",
      });
      return NextResponse.json({ response: completion.choices[0].message.content });
    } catch (error) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }