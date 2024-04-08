import { Patient, Entry } from "../../types";
import { useParams } from "react-router-dom";
import PatientEntry from "./PatientEntry";
import AddEntryForm from "./AddEntryForm";
import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import patientsService from "../../services/patients";

const SinglePatient = () => {
  const id = useParams().id as string;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getPatient = async () => {
      const patient: Patient = await patientsService.getOne(id);
      if (patient) {
        setPatient(patient);
        if (patient.entries) {
          setEntries(patient.entries);
        }
      }
    };
    getPatient();
  }, []);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4" sx={{ pt: 4, pb: 2 }}>
        {patient.name}
      </Typography>
      <Box sx={{ border: 1, p: 1 }}>
        <Typography variant="body1">
          <b>id:</b> {patient.id}
          <br></br>
          <b>name:</b> {patient.name}
          <br></br>
          <b>occupation:</b> {patient.occupation}
          <br></br>
          <b>gender:</b> {patient.gender}
          <br></br>
          <b>ssn:</b> {patient.ssn}
          <br></br>
          <b>date of birth:</b> {patient.dateOfBirth}
          <br></br>
        </Typography>
      </Box>
      <AddEntryForm id={id} entries={entries} setEntries={setEntries} />
      <Typography variant="h4" sx={{ pt: 4, pb: 2 }}>
        Entries
      </Typography>
      <Typography component={"span"} variant="body1">
        {entries &&
          entries.map((entry) => (
            <div key={entry.id}>
              <PatientEntry entry={entry} />
            </div>
          ))}
      </Typography>
    </div>
  );
};

export default SinglePatient;
