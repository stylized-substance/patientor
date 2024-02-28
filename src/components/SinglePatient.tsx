import patientService from "../services/patients";
import { useState, useEffect } from "react";
import { Patient } from "../types";
import { useParams } from "react-router-dom";

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
    </div>
  );
};

export default SinglePatient;
