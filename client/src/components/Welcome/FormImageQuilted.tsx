import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: 500, height: 800 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxMjkxNjk3NDQ4ODI4/marveldisney.jpg',
    title: 'Marvel',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://regalcdn.azureedge.net/REG/BlackAdam/HO00011065/TV_SmallPosterImage/20220926-151703754.jpg',
    title: 'Black Adam',
  },
  {
    img: 'https://m.media-amazon.com/images/M/MV5BYWFmYjBiYzItYjBlOS00NThkLTljMWEtYzQ4NTdlNDlmMjg0XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
    title: 'Artemis Fowl',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/en/1/19/Ang_Probinsyano_%28original_title_card%29.png',
    title: 'Gardo',
    cols: 2,
  },
  {
    img: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/JUJUTSU-KAISEN-0-Poster-1800-x-900.jpg',
    title: 'Jujutsu Kaisen',
    cols: 2,
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Black_Panther_Wakanda_Forever_poster.jpg/220px-Black_Panther_Wakanda_Forever_poster.jpg',
    title: 'Wakanda',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2563bf61669257.5a75ea2d930df.jpg',
    title: 'Popoye',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg',
    title: 'UP',
  },
  {
    img: 'https://m.media-amazon.com/images/M/MV5BNDgyNGM4NTYtN2M3MS00YTY2LTk0OWUtZmIzYjg3MmQ0OGM4XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg',
    title: 'Quantumania',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/en/2/2b/White_chicks.jpg',
    title: 'White Chicks',
  },
  {
    img: 'http://images.summitmedia-digital.com/spotph/images/files/2014/12/1418783642-Shake-Rattle-and-Roll_642.jpg',
    title: 'SRR',
  },
  {
    img: 'https://images.moviesanywhere.com/2afb9a102853b93e2e1784e73bacabdd/8dfec5ad-fddf-45d6-95e6-8b9fb4ff3dd6.jpg',
    title: 'AP',
    cols: 2,
  },
];