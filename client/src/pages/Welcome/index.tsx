import React from "react";
import { useNavigate } from "react-router-dom";
import FormImageQuilted from "../../components/Welcome/FormImageQuilted";
import FormSearch from "../../components/Welcome/FormSearch";
import Box from "@mui/material/Box";

const Welcome = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let value = (event.target as HTMLInputElement).value;
    setSearch(value);
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (search === "") {
      setError("Input here to search.");
    } else {
      navigate("../search", {state:search});
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex" }}>
        <FormImageQuilted />
        <FormSearch
          setSearch={setSearch}
          error={error}
          search={search}
          onChange={onChangeHandler}
          onClick={onClickSubmitHandler}
        />
      </Box>
    </>
  );
};

export default Welcome;
