import {
  AvailableSteps,
  VaccineRegistrationStepProps
} from '@/app/(mainPage)/portal/vaccine-registration/page';
import { Image } from '@mui/icons-material';
import {
  Stack,
  Divider,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material';
import { useState } from 'react';

const agreements = [
  {
    icon: '/shield_1.png',
    label:
      'Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy định.'
  },
  {
    icon: '/vaccine2_1.png',
    label:
      'Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.'
  },
  {
    icon: '/hospital_1.png',
    label:
      'Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị kịp thời.'
  }
];
export default function ConfirmStep({
  setStep,
  step
}: VaccineRegistrationStepProps) {
  const [agreement, setAgreement] = useState(false);

  const handleChange = () => {
    setAgreement((prev) => !prev);
  };
  return (
    <Stack spacing={2}>
      <Stack divider={<Divider sx={{ my: 2 }} />}>
        <Stack spacing={1}>
          {agreements.map((item, index) => (
            <Stack key={index} direction="row" spacing={1}>
              <img src={item.icon} alt="" className="w-6 h-6" />
              <Typography>
                {index + 1}. {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1">
            Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ
            và:{' '}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={false}
                  checked={agreement}
                  onChange={handleChange}
                />
              }
              label="Đồng ý tiêm chủng"
            />
          </FormGroup>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => setStep((prev) => (prev - 1) as AvailableSteps)}>
          Quay lại
        </Button>
        <Button
          variant="contained"
          disabled={!agreement}
          onClick={() => setStep((prev) => (prev + 1) as AvailableSteps)}>
          Đăng ký
        </Button>
      </Stack>
    </Stack>
  );
}
