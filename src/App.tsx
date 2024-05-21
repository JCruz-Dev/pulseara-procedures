import { useQuery } from "@tanstack/react-query";
import { getProccedures } from "./db/enpoints";
import Layout from "@components/Container/Container";
import ProcedureWrapper from "@components/ProcedureWrapper/ProcedureWrapper";
import { NoContent } from "@components/404/NoContent";
import ProcedureModal from "@components/Modal/ProcedureModal";
import { setStore, snackbarState, store, storeModal } from "@store/store.setup";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { useEffect } from "react";
import { Snackbar } from "@mui/material";

function App() {
  const setProcedureList = useSetAtom(setStore);
  const procedureListData = useAtomValue(store);
  const modalData = useAtomValue(storeModal);
  const [snackbarValue, setSnackbarValue] = useAtom(snackbarState);
  const { data, isSuccess } = useQuery({
    queryKey: ["proceduresList"],
    queryFn: getProccedures,
  });
  useEffect(() => {
    if (data) setProcedureList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const wrapperVariant = {
    no_data: "justify-center items-center w-full",
    data: "",
  };
  const addStyleAfterverifiedDataLength =
    procedureListData && procedureListData?.length > 0
      ? wrapperVariant.data
      : wrapperVariant.no_data;

  return (
    <Layout>
      <h1 className="text-procedure-black-100 text-2xl font-semibold">
        Procedimientos
      </h1>
      <section
        className={`my-9 flex flex-col ${addStyleAfterverifiedDataLength} min-h-96`}
      >
        {procedureListData && (
          <div className="flex flex-col gap-3">
            {procedureListData.map((item, index) => (
              <div key={item.id}>
                <ProcedureWrapper key={item.id} data={item} idx={index + 1} />
              </div>
            ))}
          </div>
        )}
        {!procedureListData?.length && <NoContent />}
        {procedureListData && <ProcedureModal />}

        {snackbarValue && modalData.length > 0 && procedureListData.length && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snackbarValue}
            autoHideDuration={6000}
            onClose={() => setSnackbarValue(!snackbarValue)}
            className="text-white text-center rounded-[4px]"
            ContentProps={{
              sx: {
                minWidth: "189px !important",
                background: "#306495",
                boxShadow:
                  "0px 3px 5px -1px rgba(0, 0, 0, 0.20), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
              },
            }}
            message="Procedimiento agregado"
          />
        )}
      </section>
    </Layout>
  );
}

export default App;
