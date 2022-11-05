import * as React from "react";
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

type AppProps = {
    header: string;
  movieData: ImageData[];
};

interface ImageData {
  id: string;
  title: string;
  subtitle: string;
  url: string;
}

export default function TitlebarBelowImageList({header, movieData }: AppProps) {
  return (
    <>
    <Divider textAlign="left">
      <Chip label={header} color="primary"/>
    </Divider>
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr)) !important",
        gridAutoColumns: "minmax(160px, 1fr)",
      }}
    >
      {movieData.map((movie) => (
        <ImageListItem key={movie.id}>
          <img
            src={`${movie.url}?w=248&fit=crop&auto=format`}
            srcSet={`${movie.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={movie.title}
          />
          <ImageListItemBar
            title={movie.title}
            subtitle={<span>{movie.subtitle}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </>
  );
}

