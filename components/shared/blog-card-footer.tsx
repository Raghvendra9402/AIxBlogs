import { Badge } from "../ui/badge";

interface BlogCardFooterProps {
  isPublished: boolean;
  title: string;
  authorLabel: string | null;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

const BlogCardFooter = ({
  isPublished,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: BlogCardFooterProps) => {
  return (
    <div className="relative bg-white p-3 flex flex-row justify-between items-center gap-2">
      <div className="flex-1 min-w-0">
        <p className="text-[13px] truncate">{title}</p>
        <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
          {authorLabel}, {createdAtLabel}
        </p>
      </div>
      <Badge>{isPublished ? "Published" : "Draft"}</Badge>
    </div>
  );
};

export default BlogCardFooter;
