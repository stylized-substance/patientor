import { Patient, Entry } from "../../types";
import { useParams } from "react-router-dom";
import PatientEntry from "./PatientEntry";
import AddEntryForm from "./AddEntryForm"
import { Typography, Box, } from "@mui/material";
import { useState, useEffect } from "react";
import patientsService from '../../services/patients'

interface SinglePatientProps {
  patients: Patient[];
}

const SinglePatient = ({ patients }: SinglePatientProps) => {
  const id = useParams().id;
  const [entries, setEntries] = useState<Entry[] | undefined>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  
  useEffect(() => {
    // const patient = patients.find((patient) => patient.id === id);
    const getPatient = async () => {
      const patient = await patientsService.getOne(id)
      if (patient) {
        setPatient(patient)
        setEntries(patient.entries)  
      }
    // if (id) {
    // }
  }
  getPatient()
  }, [])
  
  if (!patient) {
    return null;
  }

  
  return (
    <div>
      <Typography variant="h4" sx={{ pt: 4, pb: 2 }}>
        {patient.name}
      </Typography>
      {/* <Button variant="contained" sx={{ my: 2 }}>
        Add entry
      </Button> */}
      <AddEntryForm entries={entries} setEntries={setEntries}/>
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
