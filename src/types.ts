import { Dayjs } from "dayjs";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<string>;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: Dayjs;
    criteria: string;
  };
}

export interface HealthCheck extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type BaseEntryWithoutId = Omit<BaseEntry, "id">;

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheck;

export interface EntryFormValues {
  type: string;
  description: string;
  date: Dayjs | null;
  specialist: string;
  diagnosisCodes: Array<string>;
  employerName?: string;
  sickLeave?: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
  discharge?: {
    date: Dayjs | null;
    criteria: string;
  };
  healthCheckRating?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
