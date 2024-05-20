import { IProcedureStatusType } from "../../db/types";

export const defaultFormValues = {
  id: 0,
  procediment: "Ej: Insulina",
  procediment_code: "Ej: 12345",
  procediment_difference: "Ej: 100",
  reclaimed_amount: "Ej: 200",
  insurance_authorized_amount: "Ej: 400",
};
export const appendFormMock: {
  status_type: IProcedureStatusType;
  procediment: null;
  procediment_code: null;
  procediment_difference: null;
  reclaimed_amount: null;
  insurance_authorized_amount: null;
} = {
  status_type: "LOCAL",
  procediment: null,
  procediment_code: null,
  procediment_difference: null,
  reclaimed_amount: null,
  insurance_authorized_amount: null,
};
export const mockProcedures = [
  {
    id: "1",
    procediment: "Procedure 1",
    procediment_code: "001",
    procediment_difference: 10,
    reclaimed_amount: 20,
    insurance_authorized_amount: 15,
    status_type: "backend",
  },
  {
    id: "2",
    procediment: "Procedure 2",
    procediment_code: "002",
    procediment_difference: 5,
    reclaimed_amount: 10,
    insurance_authorized_amount: 8,
    status_type: "backend",
  },
];
