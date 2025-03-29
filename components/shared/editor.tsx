import { ControllerRenderProps } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";

export function Editor({ field }: { field: ControllerRenderProps }) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-screen min-w-full p-2 outline-none border rounded-md mt-1 overflow-y-auto prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert editor-custom",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
