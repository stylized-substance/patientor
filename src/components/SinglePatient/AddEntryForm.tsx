import { SyntheticEvent, useState, useEffect } from "react";
import entriesService from "../../services/entries";
import diagnosesService from "../../services/diagnoses";
import { EntryFormValues, Diagnosis, Entry } from "../../types";
import { Alert, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";

import {
  Box,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

interface Props {
  id: string;
  entries: Entry[] | [];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

const AddEntryForm = ({ id, entries, setEntries }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [type, setType] = useState<string>("Hospital");
  const [employerName, setEmployerName] = useState<string>("asd");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<Dayjs | null>(
    null,
  );
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState<string>("asd");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState<string>("asd");
  const [healthCheckRating, setHealthCheckRating] = useState("1");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("asd");
  const [availableDiagnosisCodes, setAvailableDiagnosisCodes] = useState<
    Diagnosis[]
  >([]);

  const showOccupationalHealthCareEntries =
    type === "OccupationalHealthcare" ? true : false;
  const showDischargeEntry = type === "Hospital" ? true : false;
  const showHealthCheckRatingEntry = type === "HealthCheck" ? true : false;

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
        diagnosisCodes,
      };

      switch (entryObject.type) {
        case "OccupationalHealthcare": {
          entryObject.employerName = employerName;
          entryObject.sickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          };
          break;
        }
        case "Hospital": {
          entryObject.discharge = {
            date: dischargeDate,
            criteria: dischargeCriteria,
          };
          break;
        }
        case "HealthCheck": {
          entryObject.healthCheckRating = healthCheckRating;
          break;
        }
      }

      try {
        const result: Entry = await entriesService.addNew(id, entryObject);
        const newState = [...entries, result];
        setEntries(newState);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        } else {
          console.log(error);
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
          <FormControl fullWidth>
            <InputLabel>Entry type:</InputLabel>
            <Select
              sx={{ mb: 2 }}
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value={"OccupationalHealthcare"}>
                Occupational healthcare
              </MenuItem>
              <MenuItem value={"Hospital"}>Hospital entry</MenuItem>
              <MenuItem value={"HealthCheck"}>Health check</MenuItem>
            </Select>
          </FormControl>
          {showOccupationalHealthCareEntries && (
            <>
              <TextField
                sx={{ mb: 2 }}
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <InputLabel sx={{ mb: 2 }}>Sick leave:</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="start"
                  value={sickLeaveStartDate}
                  onChange={(value) => setSickLeaveStartDate(value)}
                />
                <DatePicker
                  sx={{ mb: 2 }}
                  label="end"
                  value={sickLeaveEndDate}
                  onChange={(value) => setSickLeaveEndDate(value)}
                />
              </LocalizationProvider>
            </>
          )}
          {showDischargeEntry && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ mb: 2 }}
                  label="Discharge date"
                  value={dischargeDate}
                  onChange={(value) => setDischargeDate(value)}
                />
              </LocalizationProvider>
              <TextField
                sx={{ mb: 2 }}
                label="Discharge criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </>
          )}
          <TextField
            sx={{ mb: 2 }}
            label="description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label="specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          {showHealthCheckRatingEntry && (
            <FormControl fullWidth>
              <InputLabel>Health check rating</InputLabel>
              <Select
                sx={{ mb: 2 }}
                value={healthCheckRating}
                onChange={(event) => setHealthCheckRating(event.target.value)}
              >
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>Low risk</MenuItem>
                <MenuItem value={2}>High risk</MenuItem>
                <MenuItem value={3}>Critical risk</MenuItem>
              </Select>
            </FormControl>
          )}
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
          <InputLabel sx={{ mt: 2, mb: 2 }}>Date:</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="date"
              value={date}
              onChange={(value) => setDate(value)}
            />
          </LocalizationProvider>
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
