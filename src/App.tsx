import "./App.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProcedure,
  getProccedures,
  insertProccedure,
  updateProcedure,
} from "./db/enpoints";
import { IProcedures } from "./db/types";
import Layout from "./components/Container/Container";

function App() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["proceduresList"],
    queryFn: getProccedures,
  });
  const insertQuery = useMutation({
    mutationFn: insertProccedure,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const deleteQuery = useMutation({
    mutationFn: deleteProcedure,
    onSuccess: () => queryClient.invalidateQueries(),
  });
  const updateQuery = useMutation({
    mutationFn: updateProcedure,
    onSuccess: () => queryClient.invalidateQueries(),
  });
  const handleInsertData = () => {
    const p: IProcedures = {
      insurance_authorized_amount: 300,
      procediment: "Insulina",
      procediment_code: "A2445",
      procediment_difference: 50,
      reclaimed_amount: 20,
    };
    insertQuery.mutate(p);
  };
  const handleDeleteData = (id: string) => deleteQuery.mutate(id);

  const handleUpdateData = (item: IProcedures, id: string) => {
    const i = {
      ...item,
      procediment: "Insulnaxxxxs",
    };
    console.log(i);
    updateQuery.mutate({
      data: i,
      id: id,
    });
  };
  return (
    <Layout>
      <h1 className="procedure-title">Procedimientos</h1>
      {query.data?.map((item: IProcedures) => (
        <>
          <div key={item.id}>
            {item.procediment}
            {item && (
              <>
                {item.id}
                <button onClick={() => item.id && handleDeleteData(item.id)}>
                  delete
                </button>

                <button
                  onClick={() => item.id && handleUpdateData(item, item.id)}
                >
                  update
                </button>
              </>
            )}
          </div>
        </>
      ))}
      <button onClick={handleInsertData}>Insert Data</button>
    </Layout>
  );
}

export default App;
