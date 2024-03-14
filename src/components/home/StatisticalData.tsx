import { Divider, Stack, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

interface DataItemProps {
  label: string;
  value: number;
  measurement: string;
  icon: string | StaticImageData;
}

const sampleData = [
  {
    label: 'Đối tượng đăng ký tiêm',
    value: 11202030,
    measurement: 'lượt',
    icon: '/images/home/ic_register_people_1.png'
  },
  {
    label: 'Số mũi tiêm hôm qua',
    value: 1762119,
    measurement: 'mũi',
    icon: '/images/home/ic_injection.png'
  },
  {
    label: 'Số mũi đã tiêm toàn quốc',
    value: 69523654,
    measurement: 'mũi',
    icon: '/images/home/ic_injected_people.png'
  }
];

function StatisticalDataItem({
  label,
  value,
  measurement,
  icon
}: DataItemProps) {
  return (
    <Stack
      spacing={2}
      px={2}
      direction="row"
      sx={{ backgroundColor: '#fff', width: '100%', padding: '12px' }}>
      <Stack justifyContent="center" alignItems="center">
        <Image src={icon} alt={'data item icon'} width={46} height={44} />
      </Stack>
      <Stack>
        <Typography fontWeight={700}>{label}</Typography>
        <Stack direction="row" alignItems="baseline">
          <Typography fontSize="28px" fontWeight={500}>
            {value.toLocaleString()}
          </Typography>
          <Typography
            fontSize="13px"
            fontWeight={600}
            fontStyle="italic">{`(${measurement})`}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function StatisticalData() {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{
        backgroundColor: '#F7FBFE',
        padding: '16px 36px'
      }}>
      {sampleData.map((item, index) => (
        <StatisticalDataItem
          key={index}
          label={item.label}
          value={item.value}
          measurement={item.measurement}
          icon={item.icon}
        />
      ))}
    </Stack>
  );
}
