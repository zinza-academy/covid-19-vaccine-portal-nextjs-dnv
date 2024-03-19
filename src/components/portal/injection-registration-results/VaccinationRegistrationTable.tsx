import { InjectionRegistrationResultType } from '@/app/(mainPage)/portal/(accountPages)/injection-registration-results/page';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import StatusBadge from './StatusBadge';

const columnNames = [
  'STT',
  'Họ và tên',
  'Ngày sinh',
  'Giới tính',
  'Số CMND/CCCD/Mã định danh công dân',
  'Trạng thái'
];

type VaccinationRegistrationTableType = {
  injectionRegistrationResults: InjectionRegistrationResultType[];
};

export default function VaccinationRegistrationTable({
  injectionRegistrationResults
}: VaccinationRegistrationTableType) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columnNames.map((column) => {
              return (
                <TableCell
                  sx={{ fontWeight: 'bold' }}
                  align="center"
                  key={column}>
                  {column}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {injectionRegistrationResults.map((result) => {
            return (
              <TableRow key={result.order}>
                <TableCell align="center">{result.order}</TableCell>
                <TableCell align="center">{result.fullName}</TableCell>
                <TableCell align="center">{result.dateOfBirth}</TableCell>
                <TableCell align="center">{result.gender}</TableCell>
                <TableCell align="center">{result.citizenID}</TableCell>
                <TableCell align="center">
                  <StatusBadge status={result.status} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {injectionRegistrationResults.length === 0 && (
        <Typography variant="h6" textAlign="center">
          Không có bản ghi nào
        </Typography>
      )}
    </TableContainer>
  );
}
