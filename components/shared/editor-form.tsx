"use client";
import { editorSchema, EditorSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Editor } from "./editor";
import { Button } from "../ui/button";
import { Blog } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { Loader, Loader2 } from "lucide-react";
import FormTopBar from "./form-top-bar";

interface EditorFormProps {
  data: Blog;
}

export function EditorForm({ data }: EditorFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<EditorSchema>({
    resolver: zodResolver(editorSchema),
    defaultValues: {
      title: data.title,
      content: data.content || "",
    },
  });

  async function onSubmit(values: EditorSchema) {
    try {
      setIsSaving(true);
      await axios.patch(`/api/write/${data.id}`, values);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  }

  const debouncedSave = useCallback(debounce(onSubmit, 500), []);

  useEffect(() => {
    const subscribe = form.watch((values) => {
      debouncedSave(values as EditorSchema);
    });

    return () => subscribe.unsubscribe();
  }, [form.watch, debouncedSave]);

  return (
    <>
      <FormTopBar>
        <Button variant={"outline"} type="button">
          {isSaving ? (
            <div className="flex items-center gap-x-1">
              <Loader className="size-4 animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            "Saved"
          )}
        </Button>
      </FormTopBar>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextareaAutosize
                    {...field}
                    placeholder="Untitled"
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor field={field as any} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
