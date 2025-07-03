import CustomDialog from "@components/molecules/Dialog";
import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { setAlertDialog } from "@redux/common/commonThunk";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { IoWarning, IoInformationCircle } from "react-icons/io5";

const AlertDialog = () => {
  const dispatch = useAppDispatch();
  const alertDialog = useAppSelector(
    (state: IRootState) => state.common.alertDialog
  );

  const closeDialog = () => {
    dispatch(setAlertDialog({ open: false, message: "", type: "info" }));
  };

  const defineIcon = () => {
    switch (alertDialog.type) {
      case "success":
        return <FaCheckCircle size={48} color="green" />;
      case "error":
        return <FaCircleXmark size={48} color="red" />;
      case "warning":
        return <IoWarning size={48} color="#FFD700" />;
      case "info":
        return <IoInformationCircle size={48} color="blue" />;
      default:
        return <IoInformationCircle size={48} color="blue" />;
    }
  };

  return (
    <CustomDialog open={alertDialog.open} onClose={closeDialog}>
      <div className="flex justify-center">{defineIcon()}</div>
      <p className="text-center mt-10 text-lg">{alertDialog.message}</p>
      {alertDialog.description && (
        <p className="mt-10 text-sm text-center">{alertDialog.description}</p>
      )}
    </CustomDialog>
  );
};

export default AlertDialog;
