import { useState, useEffect } from 'react';
import diagnosesService from "../../services/diagnoses";
import { Entry, Diagnosis } from '../../types';

const diagnosisSection = () => {
  if (diagnoses.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      Diagnosis codes:
      <ul>
        {diagnoses.map((diagnosis) => (
          <li key={diagnosis.code}>
            {diagnosis.code} {diagnosis.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const OccupationalHealthcareEntry = () => {
  return null
}

const HospitalEntry = () => {
  return null
}

const HealthCheckEntry = () => {
  return null
}

const DefaultEntry = ({ entry, diagnoses }) => {
  return (
      <div key={entry.id}>
        Date: {entry.date}
        <br></br>
        Description: {entry.description}
        <br></br>
        {diagnosisSection()}
        <br></br>
        Diagnosed by {entry.specialist}
        <br></br>
        <br></br>
      </div>
    );
}



interface PatientEntriesProps {
  entries: Entry[];
}

const PatientEntries = ({ entries }: PatientEntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async (code: string) => {
      const result = await diagnosesService.getOne(code);
      if (result) {
        setDiagnoses((diagnoses) => diagnoses.concat(result));
      }
    };
    entries.forEach((entry) => {
      if (entry.diagnosisCodes) {
        entry.diagnosisCodes.forEach((code) => {
          getDiagnoses(code);
        });
      }
    });
  }, [entries]);

  switch(entry.type) {
    case OccupationalHealthcare:
      return null
    case Hospital:
      return null
    case HealthCheck:
      return null
    default:
      return {entries.map(entry => <DefaultEntry entry={entry} diagnoses={diagnoses} />)}
      // return null
  }
}

export default PatientEntries;