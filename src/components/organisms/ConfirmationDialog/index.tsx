import Button from "@components/atoms/Button";
import CustomDialog from "@components/molecules/Dialog";

const ConfirmationDialog = ({
  show = false,
  onClose,
  message,
  onConfirm,
}: {
  show: boolean;
  onClose: VoidFunction;
  message: string;
  onConfirm: VoidFunction;
}) => {
  return (
    <CustomDialog open={show} onClose={onClose}>
      <p className="text-center text-lg max-w-md mt-10">{message}</p>
      <div className="flex justify-center gap-10 mt-4 mb-5">
        <Button
          variant="accept"
          type="button"
          className="w-fit self-end"
          onClick={onConfirm}
        >
          Confirmar
        </Button>
        <Button
          variant="denied"
          type="button"
          className="w-fit self-end"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </CustomDialog>
  );
};

export default ConfirmationDialog;
