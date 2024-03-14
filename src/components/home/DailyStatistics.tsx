'use client';
import React, { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Paper, Typography } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};

const labels = faker.date
  .betweens({
    count: 30, // Số lượng ngày cần tạo
    from: dayjs(new Date()).subtract(1, 'month').toDate(), // Ngày bắt đầu (từ thời điểm hiện tại trừ đi 1 tháng)
    to: new Date() // Ngày kết thúc (thời điểm hiện tại)
  })
  .map((date) => dayjs(date).format('DD/MM')); // Chuyển đổi thành định dạng 'DD/MM'

export const data = {
  labels,
  datasets: [
    {
      label: 'Đã tiêm',
      // tạo ra một mảng các số ngẫu nhiên trong khoảng từ 400 đến 2,200,000.
      data: labels.map(() => faker.number.int({ min: 400, max: 2200000 })),
      borderColor: indigo[700],
      backgroundColor: pink[600]
    }
  ]
};

export default function DailyStatistics() {
  return (
    <Paper elevation={6} sx={{ padding: '24px 16px', marginX: '36px' }}>
      <Typography variant="h6">Dữ liệu tiêm theo ngày</Typography>
      <Line options={options} data={data} />
    </Paper>
  );
}
