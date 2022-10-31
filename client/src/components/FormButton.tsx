import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

type AppProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const FormButton = ({ label, onClick }: AppProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <Button variant="contained" onClick={onClick}>
        {label}
      </Button>
    </FormControl>
  );
};

export default FormButton;