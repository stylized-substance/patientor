import axios from "axios";
import { EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const addNew = async(id: string, entry: EntryFormValues) => {
  // try {
  //   const result = await axios.post<EntryFormValues>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  //   return result;
  // } catch (error) {
  //   return error;
  // }
  const result = await axios.post<EntryFormValues>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  return result;
};

export default { addNew };