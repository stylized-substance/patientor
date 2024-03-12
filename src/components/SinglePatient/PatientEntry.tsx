import { Diagnosis, Entry, OccupationalHealthcareEntry, HospitalEntry, Healthcheck } from "../../types";
import { useState, useEffect } from "react";
import diagnosesService from "../../services/diagnoses";

interface EntryProps {
  entry: Entry;
  diagnoses?: Diagnosis[]
}

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses?: Diagnosis[]
}

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses?: Diagnosis[]
}

interface HealthCheckEntryProps {
  entry: Healthcheck;
  diagnoses?: Diagnosis[]
}

const diagnosisSection = (diagnoses: Diagnosis[]) => {
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

const OccupationalHealthcareEntryInstance = ({ entry, diagnoses }: OccupationalHealthCareEntryProps) => {
  console.log(entry);
  return (
    <div key={entry.id}>
      Date: {entry.date}
      <br></br>
      Description: {entry.description}
      <br></br>
      Employer: {entry.employerName}
      <br></br>
      {entry.sickLeave && 
      <div>
        Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </div>}
      {diagnoses && diagnosisSection(diagnoses)}
      <br></br>
      Diagnosed by {entry.specialist}
      <br></br>
      <br></br>
    </div>
  );
};

const HospitalEntryInstance = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div key={entry.id}>
      Date: {entry.date}
      <br></br>
      Description: {entry.description}
      <br></br>
      <br></br>
      Discharge:
      <ul>
        <li>
          Date: {entry.discharge.date}
        </li>
        <li>
          Criteria: {entry.discharge.criteria}
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

const HealthCheckEntryInstance = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <div key={entry.id}>
      Date: {entry.date}
      <br></br>
      Description: {entry.description}
      <br></br>
      Health check rating: {entry.healthCheckRating}
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
        <div>
          <OccupationalHealthcareEntryInstance entry={entry} diagnoses={diagnoses} />
        </div>
      );
    case "Hospital":
      return (
        <div>
          <HospitalEntryInstance entry={entry} diagnoses={diagnoses} />
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <HealthCheckEntryInstance entry={entry} diagnoses={diagnoses} />
        </div>
      );
  }

  return null;
};

export default PatientEntry;