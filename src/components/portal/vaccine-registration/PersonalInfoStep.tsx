import { Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function PersonalInfoStep() {
  return (
    <form className="flex flex-col gap-4">
      <Typography variant="body1" fontWeight={600}>
        1. Thông tin người đăng ký tiêm
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          1
        </Grid>
        <Grid item xs={4}>
          8
        </Grid>
        <Grid item xs={4}>
          8
        </Grid>
        <Grid item xs={4}>
          8
        </Grid>
        <Grid item xs={4}>
          8
        </Grid>
        <Grid item xs={4}>
          8
        </Grid>
      </Grid>
      <Typography variant="body1" fontWeight={600}>
        2. Thông tin đăng ký tiêm chủng
      </Typography>
      <Stack direction={'row'} spacing={4}>
        <div>1</div>
        <div>2</div>
      </Stack>
      {/* Lưu ý */}
      <Stack spacing={2} sx={{ color: 'red' }}>
        <Typography>{`Lưu ý:`}</Typography>
        <Stack>notes</Stack>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link href="/">
          <Button variant="outlined">Hủy bỏ</Button>
        </Link>
        <Button type="submit" variant="contained" disabled={false}>
          Tiếp tục
        </Button>
      </Stack>
    </form>
  );
}
