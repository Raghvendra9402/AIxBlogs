import { ControllerRenderProps } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";
import { useCompletion } from "@ai-sdk/react";
import Text from "@tiptap/extension-text";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { marked } from "marked";

export function Editor({ field }: { field: ControllerRenderProps }) {
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/completion",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Alt-q": () => {
          const prompt = this.editor.getText().split(" ").splice(-30).join("");
          setDialogOpen(true);
          complete(prompt);
          return true;
        },
      };
    },
  });
  const editor = useEditor({
    extensions: [StarterKit, customText],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[100vh] min-w-full px-4 py-2 outline-none border rounded-md mt-1 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert editor-custom",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
  });

  const lastCompletion = useRef("");
  useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;

    // editor.commands.insertContent(diff);
  }, [completion, editor]);
  return (
    <>
      <Toolbar editor={editor} />
      <div className="relative">
        <EditorContent editor={editor} />
      </div>
      {/* {completion && (
        <div className="mt-4 p-4 border rounded bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-2">AI Suggestion Preview:</h2>
          <div className="prose dark:prose-invert">
            <ReactMarkdown>{completion}</ReactMarkdown>
          </div>
        </div>
      )} */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl">Preview AI Suggestion</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader className="animate-spin w-5 h-5 mr-2" />
              Generating...
            </div>
          ) : (
            <div className="prose dark:prose-invert p-4 overflow-y-auto rounded-md border max-h-[60vh]">
              <ReactMarkdown>{completion}</ReactMarkdown>
            </div>
          )}
          <DialogFooter className="justify-between pt-4">
            <Button
              variant={"outline"}
              disabled={isLoading}
              onClick={() => {
                if (!editor || !completion) return;
                const html = marked(completion);
                editor.commands.insertContent(html);
                setDialogOpen(false);
              }}
            >
              Insert to editor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
