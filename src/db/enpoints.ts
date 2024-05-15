import { supabase } from "./db";
import { IProcedures } from "./types";

export const getProccedures: IProcedures[] = async () => {
  const { data } = await supabase.from("Procedures").select();
  return data;
};
