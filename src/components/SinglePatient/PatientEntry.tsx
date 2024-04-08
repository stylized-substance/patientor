import {
  Diagnosis,
  Entry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheck,
} from "../../types";
import { useState, useEffect } from "react";
import diagnosesService from "../../services/diagnoses";
import { Box } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
interface EntryProps {
  entry: Entry;
  diagnoses?: Diagnosis[];
}

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses?: Diagnosis[];
}

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses?: Diagnosis[];
}

interface HealthCheckEntryProps {
  entry: HealthCheck;
  diagnoses?: Diagnosis[];
}

const diagnosisSection = (diagnoses: Diagnosis[]) => {
  if (diagnoses.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <b>Diagnosis codes:</b>
      <ul>
        {diagnoses.map((diagnosis) => (
          <li key={crypto.randomUUID()}>
            {diagnosis.code} {diagnosis.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const healthCheckIcon = (entry: HealthCheck) => {
  switch (entry.healthCheckRating) {
    case 0:
      return <FavoriteOutlinedIcon sx={{ color: "green" }} />;
    case 1:
      return <FavoriteOutlinedIcon sx={{ color: "yellow" }} />;
    case 2:
      return <FavoriteOutlinedIcon sx={{ color: "red" }} />;
    case 3:
      return <FavoriteOutlinedIcon sx={{ color: "red" }} />;
  }
};

const OccupationalHealthcareEntryInstance = ({
  entry,
  diagnoses,
}: OccupationalHealthCareEntryProps) => {
  return (
    <div key={entry.id}>
      <b>Date:</b> {entry.date}
      <WorkOutlinedIcon />
      <br></br>
      <b>Description:</b> {entry.description}
      <br></br>
      <b>Employer:</b> {entry.employerName}
      <br></br>
      {entry.sickLeave && (
        <div>
          <b>Sick leave:</b> {entry.sickLeave.startDate} -{" "}
          {entry.sickLeave.endDate}
        </div>
      )}
      {diagnoses && diagnosisSection(diagnoses)}
      <br></br>
      <b>Diagnosed by</b> {entry.specialist}
      <br></br>
      <br></br>
    </div>
  );
};

const HospitalEntryInstance = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div key={entry.id}>
      <b>
        <b>Date:</b>
      </b>{" "}
      {entry.date}
      <LocalHospitalIcon />
      <br></br>
      <b>Description:</b> {entry.description}
      <br></br>
      <br></br>
      <b>Discharge:</b>
      <ul>
        <li>
          <b>Date:</b> {entry.discharge.date.toString()}
        </li>
        <li>
          <b>Criteria:</b> {entry.discharge.criteria}
        </li>
      </ul>
      {diagnoses && diagnosisSection(diagnoses)}
      <br></br>
      Diagnosed by {entry.specialist}
      <br></br>
      <br></br>
    </div>
  );
};

const HealthCheckEntryInstance = ({
  entry,
  diagnoses,
}: HealthCheckEntryProps) => {
  return (
    <div key={entry.id}>
      <b>Date:</b> {entry.date}
      <br></br>
      <b>Description:</b> {entry.description}
      <br></br>
      <b>Health check rating:</b>
      {healthCheckIcon(entry)}
      {diagnoses && diagnosisSection(diagnoses)}
      <br></br>
      Diagnosed by {entry.specialist}
      <br></br>
      <br></br>
    </div>
  );
};

const PatientEntry = ({ entry }: EntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async (code: string) => {
      const result = await diagnosesService.getOne(code);
      if (result) {
        setDiagnoses((diagnoses) => diagnoses.concat(result));
      }
    };

    if (entry.diagnosisCodes) {
      entry.diagnosisCodes.forEach((code) => {
        getDiagnoses(code);
      });
    }
  }, [entry]);

  switch (entry.type) {
    case "OccupationalHealthcare":
      return (
        <Box sx={{ border: 1, p: 1, m: 1 }}>
          <OccupationalHealthcareEntryInstance
            entry={entry}
            diagnoses={diagnoses}
          />
        </Box>
      );
    case "Hospital":
      return (
        <Box sx={{ border: 1, p: 1, m: 1 }}>
          <HospitalEntryInstance entry={entry} diagnoses={diagnoses} />
        </Box>
      );
    case "HealthCheck":
      return (
        <Box sx={{ border: 1, p: 1, m: 1 }}>
          <HealthCheckEntryInstance entry={entry} diagnoses={diagnoses} />
        </Box>
      );
    default:
      const _exhaustiveCheck: never = entry;
      return _exhaustiveCheck;
  }
};

export default PatientEntry;
