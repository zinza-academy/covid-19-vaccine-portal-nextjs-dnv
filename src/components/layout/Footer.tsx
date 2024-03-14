import { Button, Stack } from '@mui/material';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-[#2D2188] flex justify-between text-white">
      <Stack direction={'column'} spacing={1} sx={{ fontSize: '14px' }}>
        <p>
          © Bản quyền thuộc{' '}
          <span className="font-bold">
            TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
          </span>
        </p>
        <p>
          Phát triển bởi <span className="text-red-700">Viettel</span>
        </p>
        <div className="relative h-24 w-48">
          <Image src={'/images/logo-footer-1.png'} alt="logo-footer-1" fill />
        </div>
      </Stack>

      <Stack direction={'column'} spacing={4} sx={{ alignItems: 'end' }}>
        <p className="text-sm">
          Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm
        </p>
        {/* buttons */}
        <div className="flex gap-2">
          <Button
            href="/auth/login"
            variant="outlined"
            sx={{
              fontWeight: '600',
              borderRadius: '8px 8px 8px 0px',
              borderColor: '#fff',
              color: '#fff',
              fontSize: '15px'
            }}>
            App tiêm di động (Cho HCM)
          </Button>
          <Button
            href="/auth/login"
            variant="outlined"
            sx={{
              fontWeight: '600',
              borderRadius: '8px 8px 8px 0px',
              borderColor: '#fff',
              color: '#fff',
              fontSize: '15px'
            }}>
            App Store
          </Button>
          <Button
            href="/auth/login"
            variant="outlined"
            sx={{
              fontWeight: '600',
              borderRadius: '8px 8px 8px 0px',
              borderColor: '#fff',
              color: '#fff',
              fontSize: '15px'
            }}>
            Google play
          </Button>
        </div>
        <div className="relative h-[100px] w-[220px]">
          <Image src={'/images/logo-footer-2.png'} alt="logo-footer-2" fill />
        </div>
      </Stack>
    </footer>
  );
}
