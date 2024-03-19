import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  TableCell
} from '@mui/material';
import dayjs from 'dayjs';
import { InjectionResultType } from './CertificateInfo';

type InjectionHistoryTableProp = {
  injectionResult: InjectionResultType;
};

const columnNames = [
  'Mũi số',
  'Thời gian tiêm',
  'Tên vắc xin',
  'Số lô',
  'Nơi tiêm'
];

export default function InjectionHistoryTable({
  injectionResult
}: InjectionHistoryTableProp) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#eee'
            }}>
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
          {injectionResult.map((result) => {
            return (
              <TableRow key={result.order}>
                <TableCell align="center">{result.order}</TableCell>
                <TableCell align="center">{result.injectionTime}</TableCell>
                <TableCell align="center">{result.vaccineName}</TableCell>
                <TableCell align="center">{result.batchNumber}</TableCell>
                <TableCell align="center">{result.address}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!injectionResult.length && (
        <Typography variant="h6" textAlign="center">
          Không có bản ghi nào
        </Typography>
      )}
    </TableContainer>
  );
}
