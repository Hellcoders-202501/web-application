import { IoClose } from "react-icons/io5";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FC } from "react";

interface IDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomDialog: FC<IDialogProps> = ({
  open,
  onClose,
  children,
}: IDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 bg-black/50">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out
            data-closed:transform-[scale(95%)] data-closed:opacity-0 relative"
          >
            <button
              type="button"
              className="absolute top-4 right-4 cursor-pointer"
              onClick={onClose}
            >
              <IoClose size={24} />
            </button>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
