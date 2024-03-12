import { Typography } from '@mui/material';

type FieldLabelProps = {
  text?: string;
  required?: boolean;
  htmlFor?: string;
  customClassName?: string;
};

export default function FieldLabel({
  text,
  required,
  htmlFor,
  customClassName
}: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`text-base mb-1`}>
      {text}{' '}
      {required ? (
        <Typography
          component="span"
          display="inline"
          className={`text-errorText`}>
          (*)
        </Typography>
      ) : null}
    </label>
  );
}
