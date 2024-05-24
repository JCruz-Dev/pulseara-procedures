import { atom } from "jotai";
import { IProcedures } from "@db/types";
import { atomWithDefault } from "jotai/utils";

export interface IProcedureStore {
  id?: string;
  created_at?: string;
  procediment: string;
  procediment_code: string;
  reclaimed_amount: number;
  procediment_difference: number;
  insurance_authorized_amount: number;
}
export const store = atom<IProcedureStore[]>([]);
export const snackbarState = atom(false);
export const storeModal = atomWithDefault((get) => get(store));
export const deletedProceduresState = atom<string[]>([]);
export const emitSetValueFormFunction = atom<boolean>(false);
export const modalOpeningState = atom(false);
export const setStore = atom(null, (_get, set, args: IProcedures[]) => {
  set(store, args);
});
