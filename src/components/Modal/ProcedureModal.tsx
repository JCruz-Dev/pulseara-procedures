import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import consultaIcon from "@assets/consulta.svg";
import closeModalIcon from "@assets/close.svg";
import AddProcedureIcon from "@assets/add.svg";
import RemoveProcedureIcon from "@assets/remove.svg";
import { useFieldArray, useForm } from "react-hook-form";
import {
  IProcedureStatusType,
  IProcedures,
  ProcedureStatusTypes,
} from "@db/types";
import { useMutation } from "@tanstack/react-query";
import { deleteToManyProcedures, updateAllProcedure } from "@db/enpoints";
import { useAtomValue, useSetAtom } from "jotai";
import { store, storeModal } from "@store/store.setup";
import { appendFormMock, defaultFormValues } from "./mock";
import ProcedureModalItem from "./ProcedureModalItem";

const ProcedureModal = () => {
  const procedures = useAtomValue(storeModal);
  const setStore = useSetAtom(store);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      procedure: [] as IProcedures[],
    },
  });
  const setValuesForForm = () =>
    setValue(
      "procedure",
      procedures.map((procedure) => {
        return {
          ...procedure,
          status_type: ProcedureStatusTypes.backend,
        };
      })
    );
  useEffect(() => {
    setValuesForForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [procedures]);

  const deleteQuery = useMutation({
    mutationFn: deleteToManyProcedures,
  });
  const updateQuery = useMutation({
    mutationFn: updateAllProcedure,
  });
  const { fields, remove, append } = useFieldArray({
    name: "procedure",
    keyName: "fieldId",
    control,
  });
  const handleClose = () => {
    setOpen(false);
    // Due to a Behavior of useForm After closing the modal, i have to Hydrate the fields property when user deletes but do not submit changes
    setValuesForForm();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAppendForm = () => {
    append(appendFormMock);
  };
  const handleDeleteForm = (
    procedureId: string,
    formIndex: number,
    status?: IProcedureStatusType
  ) => {
    if (status === ProcedureStatusTypes.local) {
      return remove(formIndex);
    }
    setValue(
      "procedure",
      fields.map((procedure) => {
        const { id } = procedure;
        return {
          ...procedure,
          status_type:
            id === procedureId
              ? ProcedureStatusTypes.remove_backend
              : procedure.status_type,
        };
      })
    );
  };
  const handleFormSubmit = async (data: IProcedures[]) => {
    const isRemoveInBackend = data
      .filter(
        (item) =>
          item.status_type === ProcedureStatusTypes.remove_backend && item?.id
      )
      .map((item) => item?.id ?? "");

    const newDate = new Date();
    newDate.setHours(0);
    newDate.setMinutes(0);
    const formatedData = data.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, created_at, status_type, ...rest }) => ({
        id: id ?? `${crypto.randomUUID()}`,
        created_at: created_at ?? `${newDate.toISOString()}`,
        ...rest,
      })
    );
    const normalizedData = formatedData.filter(
      ({ id }) => !isRemoveInBackend.includes(id)
    );
    // Only executes when there is items to be removed for the backend
    if (isRemoveInBackend.length > 0) {
      await deleteQuery.mutate(isRemoveInBackend);
    }
    setStore(normalizedData);
    updateQuery.mutate(formatedData);
    handleClose();
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
          <section className="mt-8 xl:mt-14 lg:mx-12 md:mx-4 flex gap-6 xl:items-baseline flex-col items-start md:items-center md:flex-row">
            <h2 className="text-procedure-blue-200 text-[2rem] leading-10 font-normal">
              Procedimientos
            </h2>
            <Button
              variant="text"
              className="flex gap-2 justify-center items-center !min-w-0 !p-0"
              onClick={handleAppendForm}
            >
              <img
                src={AddProcedureIcon}
                alt="icono de Agregar procedimiento "
              />
              <span className="text-procedure-green-100 font-body normal-case font-bold text-base">
                Añadir procedimiento
              </span>
            </Button>
          </section>
          <article className="mt-8 flex items-center w-full">
            <>
              {!fields.filter(
                (item) =>
                  item.status_type !== ProcedureStatusTypes.remove_backend
              ).length && (
                <p className="w-full ml-4 lg:ml-12 text-center bg-yellow-100 font-modal_titles text-neutral-600 text-[12px] rounded-lg p-4">
                  Debe agregar un procedimiento para poder Guardar o Cancelar
                </p>
              )}
            </>
            <form
              className="flex flex-col w-full gap-10"
              onSubmit={handleSubmit(
                (data) =>
                  handleFormSubmit(data.procedure as unknown as IProcedures[]) //Type Cast due to React Hook form EXPORTED TYPE FOR THE CALLBACK
              )}
            >
              {fields
                .filter(
                  (item) =>
                    item.status_type !== ProcedureStatusTypes.remove_backend
                )
                .map((field, index) => {
                  return (
                    <div
                      key={field.fieldId ?? index}
                      className="flex items-start lg:items-end md:px-4 lg:px-0 gap-2 md:gap-4 lg:gap-4 flex-col-reverse lg:flex-row"
                    >
                      <Button
                        variant="text"
                        role="eliminar-este-procedimiento"
                        onClick={() =>
                          handleDeleteForm(
                            field.id ?? "",
                            index,
                            field.status_type
                          )
                        }
                        className=".button-eliminar-procedimiento !min-w-8 flex gap-2 ring-1 lg:ring-0 ring-procedure-neutral-gray-100 !text-procedure-purple-100 w-full lg:!w-fit"
                      >
                        <img
                          src={RemoveProcedureIcon}
                          alt="Remover formulario de procedimiento"
                        />
                        <p className="lg:hidden">Eliminar este procedimiento</p>
                      </Button>
                      <section
                        key={field.fieldId}
                        className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-12 md:grid-cols-2  "
                      >
                        <ProcedureModalItem
                          title={`Procedimiento ${index + 1}`}
                          defaultValue={defaultFormValues.procediment}
                          callback={() =>
                            register(
                              `procedure.${index}.procediment` as "procedure"
                            )
                          }
                        />
                        <ProcedureModalItem
                          title={`Código`}
                          defaultValue={defaultFormValues.procediment_code}
                          callback={() =>
                            register(
                              `procedure.${index}.procediment_code` as "procedure"
                            )
                          }
                        />
                        <ProcedureModalItem
                          title={`Reclamado RD$`}
                          inputType="number"
                          defaultValue={`${defaultFormValues.procediment_difference.toString()}`}
                          callback={() =>
                            register(
                              `procedure.${index}.reclaimed_amount` as "procedure"
                            )
                          }
                        />
                        <ProcedureModalItem
                          title={`Diferencia RD$`}
                          inputType="number"
                          defaultValue={`${defaultFormValues.procediment_difference.toString()}`}
                          callback={() =>
                            register(
                              `procedure.${index}.procediment_difference` as "procedure"
                            )
                          }
                        />
                        <ProcedureModalItem
                          title={`Autorizado RD$`}
                          inputType="number"
                          defaultValue={defaultFormValues.insurance_authorized_amount.toString()}
                          callback={() =>
                            register(
                              `procedure.${index}.insurance_authorized_amount` as "procedure"
                            )
                          }
                        />
                      </section>
                    </div>
                  );
                })}
              <div className="w-full flex gap-4 justify-end">
                <Button
                  disabled={!fields.length}
                  variant="outlined"
                  onClick={handleClose}
                  className="!normal-case !border-2 !border-procedure-purple-200 hover:!bg-indigo-100 !text-procedure-purple-300 disabled:!bg-violet-50 disabled:!border-violet-100 disabled:!text-violet-200"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="!normal-case !bg-procedure-blue-100 !text-white flex gap-2 items-center !px-4 w-fit disabled:!bg-blue-200"
                >
                  Guardar cambios
                </Button>
              </div>
            </form>
          </article>
        </Box>
      </Modal>
    </div>
  );
};
export default ProcedureModal;
