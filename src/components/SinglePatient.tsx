import patientService from "../services/patients";
import { useState, useEffect } from "react";
import { Patient, Entry } from "../types";
import { useParams } from "react-router-dom";

interface PatientEntriesProps {
  entries: Entry[]
}

const PatientEntries = ({ entries }: PatientEntriesProps) => {
  return entries.map((entry) => (
    <div key={entry.id}>
      Date: {entry.date}
      <br></br>
      Description: {entry.description}
      <br></br>
      {entry.diagnosisCodes && (
        <div>
          Diagnosis codes:
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      )}
      <br></br>
    </div>
  ));
};

const SinglePatient = () => {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patient: Patient = await patientService.getOne(id);
        setPatient(patient);
      };
      fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h3>{patient.name}</h3>
      id: {patient.id}
      <br></br>
      name: {patient.name}
      <br></br>
      occupation: {patient.occupation}
      <br></br>
      gender: {patient.gender}
      <br></br>
      ssn: {patient.ssn}
      <br></br>
      date of birth: {patient.dateOfBirth}
      <br></br>
      <h3>Entries</h3>
      {patient.entries && <PatientEntries entries={patient.entries} />}
    </div>
  );
};

export default SinglePatient;
