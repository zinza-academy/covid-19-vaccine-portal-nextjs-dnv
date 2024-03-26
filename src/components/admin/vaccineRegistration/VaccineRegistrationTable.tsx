'use client';
import { VaccineRegistrationStatus } from '@/app/(mainPage)/portal/(accountPages)/injection-registration-results/page';
import { handleChangeRowsPerPage } from '@/app/lib/features/vaccinationPoint/vaccinationPointSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { getBadgeLabel } from '@/components/portal/injection-registration-results/StatusBadge';
import convertDateFormat from '@/utils/convertDateFormat';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const columns = [
  {
    id: 'priorityGroup',
    label: 'Nhóm ưu tiên'
  },
  {
    id: 'healthInsuranceNumber',
    label: 'Số thẻ BHYT'
  },
  {
    id: 'job',
    label: 'Nghề nghiệp'
  },
  {
    id: 'appointmentDate',
    label: 'Ngày muốn được tiêm (dự kiến)'
  },
  {
    id: 'desireddate',
    label: 'Buổi tiêm mong muốn'
  },
  {
    id: 'status',
    label: 'Trạng thái'
  },
  {
    id: 'actions',
    label: 'Thao tác'
  }
];
// demo data
const demoData = [
  {
    priorityGroup: 'Nhóm A',
    healthInsuranceNumber: '123456789',
    job: 'Giáo viên',
    appointmentDate: new Date().toISOString(),
    desireddate: 'Buổi sáng',
    status: VaccineRegistrationStatus.Accepted
  },
  {
    priorityGroup: 'Nhóm B',
    healthInsuranceNumber: '987654321',
    job: 'Kỹ sư',
    appointmentDate: new Date().toISOString(),
    desireddate: 'Buổi chiều',
    status: VaccineRegistrationStatus.Requested
  }
];

export default function VaccineRegistrationTable() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const dispatch = useAppDispatch();

  const { page, rowsPerPage, total } = useAppSelector((state) => {
    return state.vaccinationPoint;
  });

  const onChangePage = (event: unknown, newPage: number) => {
    // dispatch(handleChangePage(newPage));
    // dispatch(searchVaccinationPoints(defaultSearachParams));
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeRowsPerPage(+event.target.value));
    // dispatch(handleChangePage(0));
    // dispatch(searchVaccinationPoints(defaultSearachParams));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={'center'}
                  sx={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {demoData.map((row, index) => (
              <TableRow
                sx={{ '&:hover': { backgroundColor: '#eee' } }}
                key={index}>
                <TableCell align={'center'}>{row.priorityGroup}</TableCell>
                <TableCell align={'center'}>
                  {row.healthInsuranceNumber}
                </TableCell>
                <TableCell align={'center'}>{row.job}</TableCell>
                <TableCell align={'center'}>
                  {convertDateFormat(row.appointmentDate)}
                </TableCell>
                <TableCell align={'center'}>{row.desireddate}</TableCell>
                <TableCell align={'center'}>
                  {getBadgeLabel(row.status)}
                </TableCell>
                <TableCell align={'center'}>
                  <Button variant="contained">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Paper>
  );
}
