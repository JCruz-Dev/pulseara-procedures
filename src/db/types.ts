export type IProcedureStatusType =
  | "BACKEND"
  | "LOCAL"
  | "REMOVE_FROM_BACKEND"
  | "REMOVE_LOCALLY";

export enum ProcedureStatusTypes {
  backend = "BACKEND",
  local = "LOCAL",
  remove_backend = "REMOVE_FROM_BACKEND",
  remove_locally = "REMOVE_LOCALLY",
}
export interface IProcedures {
  id?: string;
  status_type?: IProcedureStatusType;
  created_at?: string;
  procediment: string;
  procediment_code: string;
  reclaimed_amount: number;
  procediment_difference: number;
  insurance_authorized_amount: number;
}
