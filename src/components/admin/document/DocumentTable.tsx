'use client';

import { styled } from '@mui/material/styles';
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import EditModal from './EditModal';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none'
}));

const TableHeadCell: FC<{
  label: string;
  width?: string | number | undefined;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}> = ({ label, width, align }) => {
  return (
    <TableCell align={align} width={width}>
      <Typography variant="body1" fontWeight={500}>
        {label}
      </Typography>
    </TableCell>
  );
};

const TableBodyCell: FC<{
  label: string | number;
  width?: string | number | undefined;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}> = ({ label, width, align }) => {
  return (
    <TableCell align={align} width={width}>
      <Typography variant="body2">{label}</Typography>
    </TableCell>
  );
};

interface DocumentTableProps {
  readonly?: boolean;
}

export interface FileData {
  id: number;
  path: string;
}

export interface Document {
  id: number;
  name: string;
  file: FileData;
}

const data: Document[] = [
  {
    id: 1,
    file: {
      id: 12,
      path: 'path'
    },
    name: 'Tài liệu 1'
  },
  {
    id: 2,
    file: {
      id: 21,
      path: 'path'
    },
    name: 'Tài liệu 2'
  },
  {
    id: 3,
    file: {
      id: 31,
      path: 'path'
    },
    name: 'Tài liệu 3'
  },
  {
    id: 4,
    file: {
      id: 41,
      path: 'path'
    },
    name: 'Tài liệu 4'
  }
];

export default function DocumentTable({ readonly }: DocumentTableProps) {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectDocument, setSelectDocument] = useState<Document | null>(null);

  const handleOpenEditModal = (document: Document) => {
    setSelectDocument(document);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectDocument(null);
    setEditModalOpen(false);
  };

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell label="STT" align="center" />
              <TableHeadCell label="Tên tài liệu" align="left" />
              <TableHeadCell label="Thao tác" align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((document, index) => (
                <StyledTableRow key={index}>
                  <TableBodyCell
                    label={index + 1}
                    width={'10%'}
                    align="center"
                  />
                  <TableBodyCell label={document.name} align="left" />
                  <TableCell align="center" width={'20%'}>
                    <StyledButton variant="text" size="small">
                      <a
                        download
                        href={`${process.env.NEXT_PUBLIC_API_URL}documents/download/${document.id}`}>
                        Download File
                      </a>
                    </StyledButton>
                    {readonly ? null : (
                      <StyledButton
                        variant="text"
                        size="small"
                        onClick={() => handleOpenEditModal(document)}>
                        Chỉnh sửa
                      </StyledButton>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!data || data.length === 0) && (
        <Typography textAlign="center">Không có dữ liệu</Typography>
      )}
      <EditModal
        editModalOpen={editModalOpen}
        handleCloseEditModal={handleCloseEditModal}
        document={selectDocument}
      />
    </Stack>
  );
}
