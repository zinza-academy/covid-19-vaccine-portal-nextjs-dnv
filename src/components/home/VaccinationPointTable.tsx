'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from '@/app/lib/hooks';
import {
  defaultSearachParams,
  handleChangePage,
  handleChangeRowsPerPage,
  searchVaccinationPoints
} from '@/app/lib/features/vaccinationPoint/vaccinationPointSlice';
import { useAppDispatch } from '@/app/lib/hooks';

interface Column {
  id:
    | 'orderNumber'
    | 'name'
    | 'address'
    | 'ward'
    | 'district'
    | 'city'
    | 'manager'
    | 'tableNumber';
  label: string;
}

const columns: readonly Column[] = [
  {
    id: 'orderNumber',
    label: 'STT'
  },
  {
    id: 'name',
    label: 'Tên địa điểm'
  },
  {
    id: 'address',
    label: 'Số nhà, tên đường'
  },
  {
    id: 'ward',
    label: 'Xã/Phường'
  },
  {
    id: 'district',
    label: 'Quận/Huyện'
  },
  {
    id: 'city',
    label: 'Tỉnh/Thành phố'
  },
  {
    id: 'manager',
    label: 'Người đứng đầu cơ sở tiêm chủng'
  },
  {
    id: 'tableNumber',
    label: 'Số bàn tiêm'
  }
];

export default function VaccinationPointTable() {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => {
    return state.vaccinationPoint.tableData;
  });

  const { page, rowsPerPage, total } = useAppSelector((state) => {
    return state.vaccinationPoint;
  });

  const onChangePage = (event: unknown, newPage: number) => {
    dispatch(handleChangePage(newPage));
    dispatch(searchVaccinationPoints(defaultSearachParams));
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeRowsPerPage(+event.target.value));
    dispatch(handleChangePage(0));
    dispatch(searchVaccinationPoints(defaultSearachParams));
  };

  React.useEffect(() => {
    dispatch(searchVaccinationPoints(defaultSearachParams));
  }, []);

  // duyệt qua từng hàng và thêm order number
  const startOrderNumber = page * rowsPerPage + 1;
  const numberedTableData = tableData.map((row, index) => ({
    orderNumber: startOrderNumber + index,
    ...row
  }));

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
            {numberedTableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell align={'center'}>{row.orderNumber}</TableCell>
                <TableCell align={'center'}>{row.name}</TableCell>
                <TableCell align={'center'}>{row.address}</TableCell>
                <TableCell align={'center'}>{row.ward}</TableCell>
                <TableCell align={'center'}>{row.district}</TableCell>
                <TableCell align={'center'}>{row.city}</TableCell>
                <TableCell align={'center'}>{row.manager}</TableCell>
                <TableCell align={'center'}>{row.tableNumber}</TableCell>
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
