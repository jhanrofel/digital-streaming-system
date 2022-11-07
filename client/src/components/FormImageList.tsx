import * as React from "react";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

type AppProps = {
  header: string;
  page: string;
  movieData: ImageData[];
};

interface ImageData {
  id: string;
  title: string;
  subtitle: string;
  url: string;
}

export default function FormImageList({
  header,
  page,
  movieData,
}: AppProps) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Divider textAlign="left">
        <Chip label={header} color="primary" />
      </Divider>
      <ImageList
        sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr)) !important",
        }}
      >
        {movieData.map((movie) => (
          <ImageListItem key={movie.id}>
            <img
              src={`${movie.url}`}
              alt={movie.title}
              onClick={() => navigate(`../${page}`, { state: movie.id })}
            />
            <ImageListItemBar
              title={movie.title}
              subtitle={<span>{movie.subtitle}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </React.Fragment>
  );
}
