import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LangChainAdapter } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return new NextResponse("No text found", { status: 400 });
    }
    const aiPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an advanced AI writing assistant specialized in generating high-quality, engaging blog content. Your task is to help users expand their ideas into well-structured, insightful blog sections. 
      
      ### **Instructions:**
      - **Generate coherent, well-structured text** that seamlessly continues from the user's input.
      - **Maintain a natural writing flow** while aligning with the given topic and style.
      - **Enhance readability** using varied sentence structures, transitions, and engaging language.
      - **Incorporate valuable insights** that enrich the content and provide depth.
      - **Match the domain and tone** (e.g., technical, lifestyle, business, storytelling).
      - **Avoid fluff, clichés, or generic statements**—prioritize original and impactful writing.
      - **Respect the content's length and format**, ensuring smooth integration with the existing text.
      
      Your goal is to **help users effortlessly craft compelling blog content** by providing intelligent, context-aware autocompletion that enhances their writing experience.
      `,
      ],
      ["human", "{input}"],
    ]);

    const google = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-1.5-pro",
      maxOutputTokens: 2048,
    });

    const chain = aiPrompt.pipe(google);
    const response = await chain.stream({
      input: prompt,
    });
    return LangChainAdapter.toDataStreamResponse(response);
  } catch (error) {
    console.log("[COMPLETION_API]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
