import React from "react";

type AppProps = {
  url: string;
};

const FormYoutube = ({ url }: AppProps) => {
  const embedId: string = url.substring(32);
  return (
    <React.Fragment>
      <iframe
        width="640"
        height="380"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </React.Fragment>
  );
};

export default FormYoutube;
