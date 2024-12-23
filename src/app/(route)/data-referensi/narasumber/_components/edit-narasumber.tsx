import FormNarasumber from "@/components/form/form-narasumber";
import { NarasumberForEditing } from "@/zod/schemas/narasumber";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Narasumber } from "@/zod/schemas/narasumber";

interface EditNarasumberProps {
  narasumber: NarasumberForEditing | null;
  isEditing?: boolean;
  closeDialog?: () => void;
}
const EditNarasumber = ({
  narasumber,
  isEditing,
  closeDialog = () => {},
}: EditNarasumberProps) => {
  const onCancel = () => {
    closeDialog();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      closeDialog();
    }
  };

  // Type guard to check if a value is a Date object
  const isDate = (value: any): value is Date => value instanceof Date;

  const handleOnSaveSuccess = (data: Narasumber) => {
    closeDialog();
  };

  if (!narasumber) {
    return null;
  }

  return (
    <Dialog open={isEditing} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full sm:min-w-[750px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Narasumber</DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk mengubah data narasumber
          </DialogDescription>
        </DialogHeader>
        <FormNarasumber
          onCancel={onCancel}
          onSaveSuccess={handleOnSaveSuccess}
          narasumber={narasumber}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditNarasumber;
