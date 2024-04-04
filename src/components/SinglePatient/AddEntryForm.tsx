import { SyntheticEvent, useState, useEffect } from "react";
import entriesService from "../../services/entries";
import diagnosesService from "../../services/diagnoses";
import { useParams } from "react-router-dom";
import { EntryFormValues, Diagnosis } from "../../types";
import { Alert, FormControl, Input } from "@mui/material";
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
import { Label } from "@mui/icons-material";

const AddEntryForm = ({ entries, setEntries }) => {
  // const [errorMessage, setErrorMessage] = useState<string|null>(null);
  // const [type, setType] = useState("");
  // const [description, setDescription] = useState("");
  // const [date, setDate] = useState("");
  // const [specialist, setSpecialist] = useState("");
  // const [healthCheckRating, setHealthCheckRating] = useState("");
  // const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  // const [availableDiagnosisCodes, setAvailableDiagnosisCodes] = useState<Diagnosis[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [type, setType] = useState("HealthCheck");
  const [description, setDescription] = useState("asd");
  const [date, setDate] = useState("2020-12-12");
  const [specialist, setSpecialist] = useState("asd");
  const [healthCheckRating, setHealthCheckRating] = useState("1");
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [availableDiagnosisCodes, setAvailableDiagnosisCodes] = useState<
    Diagnosis[]
  >([]);

  const id = useParams().id;

  useEffect(() => {
    diagnosesService
      .getAll()
      .then((result) => setAvailableDiagnosisCodes(result));
  }, []);

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (id) {
      const entryObject: EntryFormValues = {
        type,
        description,
        date,
        specialist,
        healthCheckRating,
        diagnosisCodes,
      };
      try {
        const result = await entriesService.addNew(id, entryObject);
        setEntries(entries.concat(result.data))
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        } else {
          console.log(error)
        }
      }
    }
  };

  return (
    <div>
      {`${type}_menu`}

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
          {/* <TextField
            sx={{ mb: 2 }}
            label="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          /> */}
          <TextField
            sx={{ mb: 2 }}
            label="specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          {/* <TextField
            sx={{ mb: 2 }}
            label="healthCheckRating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          /> */}
          <FormControl fullWidth>
            <InputLabel>Health check rating</InputLabel>
            <Select
              value={healthCheckRating}
              onChange={(event) => setHealthCheckRating(event.target.value)}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low risk</MenuItem>
              <MenuItem value={2}>High risk</MenuItem>
              <MenuItem value={3}>Critical risk</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Diagnosis codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={({ target }) =>
                setDiagnosisCodes(diagnosisCodes.concat(target.value))
              }
            >
              {availableDiagnosisCodes.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel>Date:</InputLabel>
          <Input
            value={date}
            type="date"
            onChange={(event) => setDate(event.target.value)}
          />
          <br></br>
          <Button type="submit" variant="contained">
            Add new
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;
