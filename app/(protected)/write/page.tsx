import { BlogForm } from "@/components/shared/blog-form";
import { CardWrapper } from "@/components/shared/CardWrapper";
import { EditorForm } from "@/components/shared/editor-form";

const Write = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <CardWrapper title="Create Blog">
        <BlogForm />
      </CardWrapper>
    </div>
  );
};

export default Write;
