import { IProcedures, ProcedureStatusTypes } from "@/db/types";

export const formatFormData = (data: IProcedures[]) => {
  const newDate = new Date();
  newDate.setHours(0);
  newDate.setMinutes(0);
  return data.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ id, created_at, status_type, ...rest }) => ({
      id: id ?? `${crypto.randomUUID()}`,
      created_at: created_at ?? `${newDate.toISOString()}`,
      ...rest,
    })
  );
};
export const searchForRemovedItems = (data: IProcedures[]) =>
  data
    .filter(
      (item) =>
        item.status_type === ProcedureStatusTypes.remove_backend && item?.id
    )
    .map((item) => item?.id ?? "");

export const generateDataWithBackendStatus = (
  data: IProcedures[],
  procedureId: string
) =>
  data.map((procedure) => {
    const { id } = procedure;
    return {
      ...procedure,
      status_type:
        id === procedureId
          ? ProcedureStatusTypes.remove_backend
          : procedure.status_type,
    };
  });
