import axios from "axios";
import { Entry, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const addNew = async (id: string, entry: EntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry,
  );
  return data;
};

export default { addNew };
