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

  // const patientEntries = () => {
  //   if (!patient.entries) {
  //     return (<div></div>);
  //   }

  //   return patient.entries.map((entry) => {
  //     const listKey = crypto.randomUUID()

  //     return (
  //     <div>
  //       Date: {entry.date}
  //       <br></br>
  //       Description: {entry.description}
  //       <br></br>
  //       {entry.diagnosisCodes && (
  //         <div>
  //           Diagnosis codes:
  //           <ul>
  //             {entry.diagnosisCodes.map((code) => (
  //               <li key={listKey}>
  //                 {code}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //       <br></br>
  //     </div>
  // )});
  // };

  const patientEntries = () => {
    if (!patient.entries) {
      return <div></div>;
    }

    return patient.entries.map((entry) => (
      <div>
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
      {patientEntries()}
    </div>
  );
};

export default SinglePatient;
