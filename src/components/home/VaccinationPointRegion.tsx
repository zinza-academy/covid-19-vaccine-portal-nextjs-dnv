import { Paper, Typography, Divider } from '@mui/material';

export default function VaccinationPointRegion() {
  return (
    <Paper
      elevation={6}
      sx={{ padding: '24px 16px', marginX: '36px', marginY: '26px' }}>
      <Typography variant="h6">Tra cứu điểm tiêm theo địa bàn</Typography>
      <p>Toolbar</p>
      <Divider sx={{ pt: 2 }} />
      <p>Table</p>
    </Paper>
  );
}
