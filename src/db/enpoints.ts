import { supabase } from "./db";
import { IProcedures } from "./types";

type RequestData = Promise<IProcedures[]>;
const currentTable = "procedures";
export const getProccedures = async (): RequestData => {
  try {
    const { data: procedures } = await supabase.from(currentTable).select("*");
    return procedures ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const insertProccedure = async (data: IProcedures) => {
  try {
    await supabase.from(currentTable).insert([data]).select();
  } catch (error) {
    console.log(error);
  }
};
export const deleteProcedure = async (id: string) => {
  try {
    await supabase.from(currentTable).delete().eq("id", id);
  } catch (error) {
    console.log(error);
  }
};
export const updateProcedure = async ({
  data,
  id,
}: {
  data: IProcedures;
  id: string;
}) => {
  try {
    await supabase.from(currentTable).update(data).eq("id", id);
  } catch (error) {
    console.log(error);
  }
};
