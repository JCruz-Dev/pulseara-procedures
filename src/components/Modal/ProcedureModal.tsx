import { Box, Button, Modal } from "@mui/material";
import consultaIcon from "@assets/consulta.svg";
import closeModalIcon from "@assets/close.svg";
import { useAtom, useSetAtom } from "jotai";
import {
  emitSetValueFormFunction,
  modalOpeningState,
} from "@store/store.setup";
import ModalForm from "./ModalForm";

const ProcedureModal = () => {
  const [open, setOpen] = useAtom(modalOpeningState);
  const executeValuesFormFunction = useSetAtom(emitSetValueFormFunction);

  const handleClose = () => {
    setOpen(false);
    // Due to a Behavior of useForm After closing the modal, i have to Hydrate the fields property when user deletes but do not submit changes
    executeValuesFormFunction(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="mt-9">
      <Button
        data-
        className="!font-body !normal-case !bg-procedure-blue-100 !text-white flex gap-2 items-center !px-4 w-fit"
        onClick={handleClickOpen}
      >
        <img src={consultaIcon} alt="consulta icono" />
        <span>Editar procedimientos</span>
      </Button>
      <Modal open={open} onClose={handleClose} role="dialog">
        <Box className="bg-white w-11/12 max-w-[1041px] h-[456px] p-4 lg:p-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden overflow-y-auto">
          <div className="w-full flex justify-end absolute top-2 right-2">
            <Button size="small" className="!min-w-6">
              <img
                src={closeModalIcon}
                alt="Close modal icon"
                onClick={handleClose}
              />
            </Button>
          </div>
          <ModalForm />
        </Box>
      </Modal>
    </div>
  );
};
export default ProcedureModal;
