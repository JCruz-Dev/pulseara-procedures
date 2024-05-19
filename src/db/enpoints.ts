import { supabase } from "./db";
import { IProcedures } from "./types";

type RequestData = Promise<IProcedures[]>;
const currentTable = "procedures";
export const getProccedures = async (): RequestData => {
  try {
    const { data: procedures } = await supabase
      .from(currentTable)
      .select("*")
      .order("created_at", { ascending: true });
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
export const deleteToManyProcedures = async (data: string[]) => {
  try {
    await supabase.from(currentTable).delete().in("id", data);
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
    await supabase.from(currentTable).update(data).eq("id", id).select();
  } catch (error) {
    console.log(error);
  }
};
export const updateAllProcedure = async (data: IProcedures[]) => {
  try {
    await supabase.from(currentTable).upsert(data).select();
  } catch (error) {
    console.log(error);
  }
};
