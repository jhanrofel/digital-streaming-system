import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type AppProps = {
  title: string;
  link: string;
};

const FormCard = ({ title, link }: AppProps) => {
  return (
    <Card sx={{ width: 250 }}>
      <CardMedia
        component="img"
        height="300"
        image={link}
        alt={title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FormCard;
