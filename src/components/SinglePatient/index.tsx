import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import PatientEntry from "./PatientEntry";
import { Typography, Box } from "@mui/material";

interface SinglePatientProps {
  patients: Patient[]
}

const SinglePatient = ({ patients }: SinglePatientProps) => {
  const id = useParams().id;
  const patient = patients.find(patient => patient.id === id);
  console.log(patient);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4" sx={{pt: 4, pb: 2}}>
        {patient.name}
      </Typography>
      <Box sx={{border: 1, p: 1}}>
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
      <Typography variant="h4" sx={{pt: 4, pb: 2}}>
        Entries
      </Typography>
      <Typography variant="body1">
        {patient.entries && patient.entries.map((entry) => <PatientEntry entry={entry} />)}
      </Typography>
    </div>
  );
};

export default SinglePatient;
