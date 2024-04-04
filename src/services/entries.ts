import axios from "axios";
import { EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const addNew = async(id: string, entry: EntryFormValues) => {
  const result = await axios.post<EntryFormValues>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  console.log(result)
  return result;
};

export default { addNew };