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
import { searchVaccinationPoints } from '@/app/lib/features/vaccinationPoint/vaccinationPointSlice';
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
    label: 'Tên'
  },
  {
    id: 'address',
    label: 'Dia chi'
  },
  {
    id: 'ward',
    label: 'phường'
  },
  {
    id: 'district',
    label: 'quận'
  },
  {
    id: 'city',
    label: 'Thành phố'
  },
  {
    id: 'manager',
    label: 'Quản lý'
  },
  {
    id: 'tableNumber',
    label: 'Bàn tiêm'
  }
];

export default function VaccinationPointTable() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => {
    return state.vaccinationPoint.tableData;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  React.useEffect(() => {
    dispatch(searchVaccinationPoints({ city: '', district: '', ward: '' }));
  }, []);

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
            {tableData.map((row) => {
              const data = Object.values(row);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {data.map((val, index) => {
                    return (
                      <TableCell key={index} align={'center'}>
                        {val}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 3]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
