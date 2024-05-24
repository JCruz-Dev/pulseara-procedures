import {
  deletedProceduresState,
  emitSetValueFormFunction,
  modalOpeningState,
  snackbarState,
  store,
  storeModal,
} from "@/store/store.setup";
import { Button } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ReactElement, useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ProcedureModalItem from "./ProcedureModalItem";
import { appendFormMock, defaultFormValues } from "./mock";
import { IProcedures, ProcedureStatusTypes } from "@/db/types";
import { useDeleteQuery, useUpdateQuery } from "./hooks";
import SaveChanges from "@assets/save.svg";
import AddProcedureIcon from "@assets/add.svg";
import RemoveProcedureIcon from "@assets/remove.svg";
import { formatFormData } from "./utils";

const ModalForm = (): ReactElement => {
  const procedures = useAtomValue(storeModal);
  const callSetValuesFormFunction = useAtomValue(emitSetValueFormFunction);
  const [deletedProcedures, setDeletedProcedures] = useAtom(
    deletedProceduresState
  );
  const setOpen = useSetAtom(modalOpeningState);
  const deleteQuery = useDeleteQuery();
  const updateQuery = useUpdateQuery();
  const setStore = useSetAtom(store);
  const setSnackbarValue = useSetAtom(snackbarState);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      procedure: [] as IProcedures[],
    },
  });
  const { fields, remove, append } = useFieldArray({
    name: "procedure",
    keyName: "fieldId",
    control,
  });
  const setValuesForForm = useCallback(() => {
    const formValues = procedures.map((procedure) => ({
      ...procedure,
      status_type: ProcedureStatusTypes.backend,
    }));
    setValue("procedure", formValues);
  }, [procedures, setValue]);

  const handleAppendForm = () =>
    append(appendFormMock as unknown as IProcedures);

  const handleDeleteForm = (procedureId: string, formIndex: number) => {
    setDeletedProcedures([...deletedProcedures, procedureId]);
    remove(formIndex);
  };
  const handleClose = () => {
    setOpen(false);
    setValuesForForm();
  };
  useEffect(() => setValuesForForm(), [procedures, setValuesForForm]); // When Procedures Change
  useEffect(
    () => setValuesForForm(),
    [callSetValuesFormFunction, setValuesForForm]
  ); // When Modal is closed

  const handleFormSubmit = async (data: IProcedures[]) => {
    const formatedData = formatFormData(data);
    const normalizedData = formatedData.filter(
      ({ id }) => !deletedProcedures.includes(id)
    );
    // Only executes when there is items to be removed for the backend
    if (deletedProcedures.length > 0) {
      deleteQuery.mutate(deletedProcedures);
    }
    setStore(normalizedData);
    updateQuery.mutate(formatedData);
    setOpen(false);
    setSnackbarValue(true);
  };
  return (
    <>
      <section className="mt-8 xl:mt-14 lg:mx-12 md:mx-4 flex gap-6 xl:items-baseline flex-col items-start md:items-center md:flex-row">
        <h2 className="text-procedure-blue-200 text-[2rem] leading-10 font-normal">
          Procedimientos
        </h2>
        <Button
          variant="text"
          className="flex gap-2 justify-center items-center !min-w-0 !p-0"
          onClick={handleAppendForm}
        >
          <img src={AddProcedureIcon} alt="icono de Agregar procedimiento " />
          <span className="text-procedure-green-100 font-body normal-case font-bold text-base">
            Añadir procedimiento
          </span>
        </Button>
      </section>
      <article className="mt-8 flex items-center w-full flex-col lg:flex-row gap-8">
        <>
          {!fields.filter(
            (item) => item.status_type !== ProcedureStatusTypes.remove_backend
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
              (item) => item.status_type !== ProcedureStatusTypes.remove_backend
            )
            .map((field, index) => {
              return (
                <div
                  key={field.fieldId ?? index}
                  className="flex items-start lg:items-end md:px-4 lg:px-0 gap-8 md:gap-4 lg:gap-4 flex-col-reverse lg:flex-row"
                >
                  <Button
                    variant="text"
                    role="eliminar-este-procedimiento"
                    onClick={() => handleDeleteForm(field.id ?? "", index)}
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
                    className="grid  grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-[58px] w-full"
                  >
                    <ProcedureModalItem
                      title={`Procedimiento ${index + 1}`}
                      defaultValue={defaultFormValues.procediment}
                      customClasses=" w-full lg:w-[181px]"
                      callback={() =>
                        register(
                          `procedure.${index}.procediment` as "procedure",
                          {
                            required: true,
                          }
                        )
                      }
                    />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                      <ProcedureModalItem
                        title={`Código`}
                        defaultValue={defaultFormValues.procediment_code}
                        callback={() =>
                          register(
                            `procedure.${index}.procediment_code` as "procedure",
                            {
                              required: true,
                            }
                          )
                        }
                      />
                      <ProcedureModalItem
                        title={`Reclamado RD$`}
                        inputType="number"
                        defaultValue={`${defaultFormValues.procediment_difference.toString()}`}
                        callback={() =>
                          register(
                            `procedure.${index}.reclaimed_amount` as "procedure",
                            {
                              required: true,
                            }
                          )
                        }
                      />
                      <ProcedureModalItem
                        title={`Diferencia RD$`}
                        inputType="number"
                        defaultValue={`${defaultFormValues.procediment_difference.toString()}`}
                        callback={() =>
                          register(
                            `procedure.${index}.procediment_difference` as "procedure",
                            {
                              required: true,
                            }
                          )
                        }
                      />
                      <ProcedureModalItem
                        title={`Autorizado RD$`}
                        inputType="number"
                        defaultValue={defaultFormValues.insurance_authorized_amount.toString()}
                        callback={() =>
                          register(
                            `procedure.${index}.insurance_authorized_amount` as "procedure",
                            {
                              required: true,
                            }
                          )
                        }
                      />
                    </div>
                  </section>
                </div>
              );
            })}
          <div className="w-full flex gap-4 justify-end">
            <Button
              disabled={!fields.length}
              variant="outlined"
              onClick={handleClose}
              sx={{ maxWidth: "138px" }}
              className="w-full !normal-case !border-2 !border-procedure-purple-200 hover:!bg-indigo-100 !text-procedure-purple-300 xl:!min-w-[138px] xl:!h-[32px] disabled:!bg-violet-50 disabled:!border-violet-100 disabled:!text-violet-200"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="!normal-case !bg-procedure-blue-100 !text-white flex gap-2 items-center !px-4 w-fit xl:min-w-[138px] xl:h-[32px] disabled:!bg-blue-200 justify-center"
            >
              <img src={SaveChanges} alt="Guardar cambios icon" />
              Guardar cambios
            </Button>
          </div>
        </form>
      </article>
    </>
  );
};
export default ModalForm;
