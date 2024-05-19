import { Card } from "@mui/material";
import ProcedureItem from "./ProcedureItem/ProcedureItem";
import { IProcedureStore } from "@store/store.setup";

const ProcedureWrapper = ({
  data,
  idx,
}: {
  data: IProcedureStore;
  idx?: number;
}) => {
  const {
    procediment,
    procediment_code,
    procediment_difference,
    reclaimed_amount,
    insurance_authorized_amount,
  } = data;
  return (
    <Card className=" bg-white grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5-auto  gap-2 px-8 py-4 !shadow-none !rounded-xl xl:max-w-[941px]">
      <ProcedureItem
        title="Procedimiento"
        id={idx}
        description={procediment}
        testId="procedure-item-Procedimiento"
      />
      <ProcedureItem
        title="Código"
        description={procediment_code}
        testId="procedure-item-codigo"
      />
      <ProcedureItem
        title="Reclamado"
        description={`RD$ ${reclaimed_amount}`}
        testId="procedure-item-reclamado"
      />
      <ProcedureItem
        title="Diferencia RD$"
        description={`RD$ ${procediment_difference}`}
        testId="procedure-item-difference"
      />
      <ProcedureItem
        title="Autorizado RD$"
        description={`RD$ ${insurance_authorized_amount}`}
        testId={"procedure-item-insurance"}
      />
    </Card>
  );
};
export default ProcedureWrapper;
