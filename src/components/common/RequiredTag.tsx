import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';

export default function RequiredTag() {
  return (
    <Typography component="span" display="inline" color={red[600]}>
      (*)
    </Typography>
  );
}
