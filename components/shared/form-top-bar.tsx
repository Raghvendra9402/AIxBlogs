import { Loader, Trash2, Upload } from "lucide-react";
import { Button } from "../ui/button";

const FormTopBar = ({
  children,
  handleDelete,
  handlePublish,
  published,
  disableDelete,
  disablePublish,
}: {
  children: React.ReactNode;
  handleDelete?: () => void;
  handlePublish?: () => void;
  published?: boolean;
  disableDelete: boolean;
  disablePublish?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between p-2">
      <div>{children}</div>
      <div className="flex flex-row items-center gap-x-4">
        <Button
          variant={"destructive"}
          onClick={handleDelete}
          disabled={disableDelete}
          className="cursor-pointer"
        >
          {disableDelete ? (
            <Loader className="size-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="size-4 mr-2" />
          )}
          {disableDelete ? "Deleting..." : "Delete"}
        </Button>
        <Button
          variant={"outline"}
          onClick={handlePublish}
          disabled={disablePublish}
          className="cursor-pointer"
        >
          {disablePublish ? (
            <Loader className="size-4 mr-2 animate-spin" />
          ) : (
            <Upload className="size-4 mr-2" />
          )}
          {disablePublish ? "Publishing" : published ? "Published" : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default FormTopBar;
