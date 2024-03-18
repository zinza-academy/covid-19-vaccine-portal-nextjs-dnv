import { Stack, Typography, Grid, Button } from '@mui/material';
import { red, blue } from '@mui/material/colors';
import Link from 'next/link';

export default function ResultStep() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là{' '}
        <Typography component="span" variant="h5" color={'red'}>
          1
        </Typography>{' '}
      </Typography>
      <Typography variant="body1" textAlign="center">
        Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y
        tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối
        tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ liên
        hệ với quý khách theo email{' '}
        <Typography component="span" variant="body1" color={blue[500]}>
          1
        </Typography>{' '}
        khi có kế hoạch tiêm trong thời gian sớm nhất.
      </Typography>
      <Typography variant="body1" textAlign="center">
        {`Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại `}
        <Typography component="span" variant="body1" color={red[500]}>
          https://hssk.kcb.vn/#/sskdt
        </Typography>{' '}
        để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng COVID-19
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1">Họ và tên</Typography>
          <Typography variant="body1" fontWeight={600}>
            abc
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Ngày sinh</Typography>
          <Typography variant="body1" fontWeight={600}>
            date
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Giới tính</Typography>
          <Typography variant="body1" fontWeight={600}>
            nam
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
            Số CMND/CCCD/Mã định danh công dân
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            nu
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Số thẻ BHYT</Typography>
          <Typography variant="body1" fontWeight={600}></Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Tỉnh/Thành phố</Typography>
          <Typography variant="body1" fontWeight={600}>
            city
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Quận/Huyện</Typography>
          <Typography variant="body1" fontWeight={600}>
            district
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Xã/Phường</Typography>
          <Typography variant="body1" fontWeight={600}>
            xa
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Ngày tiêm đã đăng ký</Typography>
          <Typography variant="body1" fontWeight={600}>
            N gày tiêm đã đăng ký
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Buổi tiêm đã đăng ký</Typography>
          <Typography variant="body1" fontWeight={600}>
            buoi tiem
          </Typography>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link href="/">
          <Button variant="outlined">Trang chủ</Button>
        </Link>
        <Button variant="contained">Xuất thông tin</Button>
      </Stack>
    </Stack>
  );
}
