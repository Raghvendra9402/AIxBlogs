"use client";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import { FormatEditorContent } from "./format-editor-content";

interface BlogData {
  title: string;
  content: string;
  createdAt: string;
  user: {
    image: string;
    name: string;
  };
}

interface MainBlogComponentProps {
  data: BlogData;
}

function safeParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Invalid JSON:", error);
    return null;
  }
}

export function MainBlogComponent({ data }: MainBlogComponentProps) {
  const parsedContent = safeParseJSON(data.content);
  return (
    <div className="flex flex-col space-y-6 px-10">
      <div>
        <TextareaAutosize
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-4xl font-bold focus:outline-none"
          value={data.title}
        />
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <Image
            src={data.user.image}
            alt={data.user.name.slice(0, 1).toUpperCase()}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="text-lg">{data.user.name}</span>
          <span className="text-xs text-slate-500">{data.createdAt}</span>
        </div>
      </div>
      <div>{/**TODO:: LIKE FOLLOW SHARE TAB */}</div>
      <div>
        {parsedContent ? (
          <FormatEditorContent json={parsedContent} />
        ) : (
          <p className="text-slate-500">No content available</p>
        )}
      </div>
    </div>
  );
}
