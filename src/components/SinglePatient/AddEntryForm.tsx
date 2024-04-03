import { SyntheticEvent, useState } from "react";
import entriesService from "../../services/entries";
import { useParams } from "react-router-dom";
import { EntryFormValues } from "../../types";
import Alert from '@mui/material/Alert';
import axios from "axios";

import {
  Box,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";


const AddEntryForm = () => {
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([""]);

  const id = useParams().id;

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (id) {
      const entryObject: EntryFormValues = {
        type,
        description,
        date,
        specialist,
        healthCheckRating,
        //diagnosisCodes
      };
      try {
        const result = await entriesService.addNew(id, entryObject);
        console.log(result);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        } else {
          console.log('Unknown error');
        }
      }
    }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add new entry
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Box sx={{ mb: 2, boxShadow: 2 }}>
        <form onSubmit={addEntry}>
          <TextField
            sx={{ mb: 2 }}
            label="type"
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label="description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label="specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label="healthCheckRating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
          {/* <TextField
            sx={{ mb: 2 }}
            label="diagnosisCodes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(diagnosisCodes.concat(target.value))}
          /> */}
          <Button
            type="submit"
            variant="contained"
          >
          Add new
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;