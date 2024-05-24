import {
  deleteToManyProcedures,
  getProccedures,
  updateAllProcedure,
} from "@/db/enpoints";
import { setStore } from "@/store/store.setup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const useGetProcedures = () => {
  const setProceduresList = useSetAtom(setStore);
  const { data, isSuccess } = useQuery({
    queryKey: ["procedureList"],
    queryFn: getProccedures,
  });
  useEffect(() => {
    if (data) setProceduresList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return {
    data,
  };
};

export const useDeleteQuery = () => {
  const { mutate } = useMutation({
    mutationFn: deleteToManyProcedures,
  });
  return { mutate };
};

export const useUpdateQuery = () => {
  const { mutate } = useMutation({
    mutationFn: updateAllProcedure,
  });
  return { mutate };
};
