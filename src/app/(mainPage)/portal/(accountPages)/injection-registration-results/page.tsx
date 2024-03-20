import VaccinationRegistrationTable from '@/components/portal/injection-registration-results/VaccinationRegistrationTable';

export enum VaccineRegistrationStatus {
  Requested = 'requested',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Completed = 'completed'
}

export type InjectionRegistrationResultType = {
  order: number;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  citizenID: string;
  status: VaccineRegistrationStatus;
};

// demo data
const injectionRegistrationResults: InjectionRegistrationResultType[] = [
  {
    order: 1,
    fullName: 'Nguyễn Văn A',
    dateOfBirth: new Date().toISOString(),
    citizenID: '030012345678',
    status: VaccineRegistrationStatus.Accepted,
    gender: 'Nam'
  }
];
export default function InjectionRegistrationResultsPage() {
  return (
    <VaccinationRegistrationTable
      injectionRegistrationResults={injectionRegistrationResults}
    />
  );
}
