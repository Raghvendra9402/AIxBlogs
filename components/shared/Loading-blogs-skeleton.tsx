import { Skeleton } from "../ui/skeleton";

export function LoadingBlogsSkeleton() {
  return (
    <div className="flex flex-col my-2 gap-y-1">
      <div className="flex items-center gap-x-2">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="ml-4 h-7 w-[70px] rounded-lg" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Skeleton
          className="
                        h-[125px] w-[700px] rounded-md
                    "
        />
        <Skeleton className="h-5 w-[700px]" />
      </div>
    </div>
  );
}
