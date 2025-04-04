"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { blogFormSchema, BlogFormSchema } from "@/lib/form-schema";
import toast from "react-hot-toast";
import { onBlogSubmit } from "@/actions/blog";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { Combobox } from "../ui/combobox";

interface BlogFormProps {
  categoryData: Category[];
  categoryOptions: { label: string; value: string }[];
}

export function BlogForm({ categoryData, categoryOptions }: BlogFormProps) {
  const router = useRouter();
  const form = useForm<BlogFormSchema>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      categoryId: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: BlogFormSchema) {
    const toastId = toast.loading("Creating Blog...");
    try {
      const res = await onBlogSubmit(values);
      if (res && "id" in res) {
        toast.success("Blog created successfully", { id: toastId });
        router.push(`/write/${res.id}`);
        form.reset();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of your blog" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 mt-0 italic">
                Don't worry you can change your blog title anytime.
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  options={categoryOptions}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 mt-0 italic">
                You can't change it afterwards.
              </p>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
