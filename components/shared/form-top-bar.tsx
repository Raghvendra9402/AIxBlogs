import { Trash2, Upload } from "lucide-react";
import { Button } from "../ui/button";

const FormTopBar = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between p-2">
      <div>{children}</div>
      <div className="flex flex-row items-center gap-x-4">
        <Button variant={"destructive"} onClick={onClick} disabled={disabled}>
          <Trash2 className="size-4 mr-2" />
          Delete
        </Button>
        <Button variant={"outline"} onClick={onClick}>
          <Upload className="size-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
};

export default FormTopBar;
