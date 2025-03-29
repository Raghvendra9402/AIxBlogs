import { onBlogSubmit } from "@/actions/blog";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { BlogsPage } from "./types";
import toast from "react-hot-toast";

export function useBlogSubmitMutation() {
  const toastId = toast.loading("Creating blog...");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: onBlogSubmit,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(["blog"], (oldData: any) => {
        return oldData ? [...oldData, newBlog] : [newBlog];
      });
      toast.success("Blog created successfully", { id: toastId });
    },
    onError(error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    },
  });

  return mutation;
}
