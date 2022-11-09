import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IAutoCompleteOption,
  IMovieFormErrors,
  IMovieFormValues,
} from "../../utilities/types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { SelectChangeEvent } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FormAutoComplete from "../FormAutoComplete";
import FormButton from "../FormButton";
import FormText from "../FormText";
import FormSelect from "../FormSelect";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: IMovieFormValues;
  formErrors: IMovieFormErrors;
  actorsOption: IAutoCompleteOption[];
  categoriesOption: IAutoCompleteOption[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onChangeActors: any;
  onChangeCategories: any;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

const optionData = ["True", "False"];

const MovieAddForm = ({
  formErrors,
  formValues,
  actorsOption,
  categoriesOption,
  onClick,
  onChange,
  onChangeSelect,
  onChangeActors,
  onChangeCategories,
  onClickCloseAlert,
}: AppProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", maxWidth: 600 }}>
        <FormText
          name="title"
          value={formValues.title}
          label="Title"
          type="search"
          error={formErrors.title}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", maxWidth: 600 }}>
        <FormText
          name="cost"
          value={formValues.cost.toString()}
          label="Cost"
          type=""
          error={formErrors.cost}
          onChange={onChange}
        />
        <FormText
          name="yearReleased"
          value={formValues.yearReleased.toString()}
          label="Year Released"
          type=""
          error={formErrors.yearReleased}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", maxWidth: 600 }}>
        <FormSelect
          name="comingSoon"
          value={formValues.comingSoon}
          label="Coming Soon"
          options={optionData}
          onChange={onChangeSelect}
        />
        <FormSelect
          name="featured"
          value={formValues.featured}
          label="Featured"
          options={optionData}
          onChange={onChangeSelect}
        />
      </Box>
      <Divider
        sx={{ display: "flex", maxWidth: 800, paddingTop: 1 }}
        textAlign="left"
      >
        LINKS
      </Divider>
      <Box sx={{ display: "flex", maxWidth: 800 }}>
        <FormText
          name="catalogue"
          value={formValues.catalogue}
          label="Catalogue"
          type="search"
          error={formErrors.catalogue}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", maxWidth: 800 }}>
        <FormText
          name="trailer"
          value={formValues.trailer}
          label="Trailer"
          type="search"
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", width: 800 }}>
        <FormAutoComplete
          id="actors"
          label="Actors"
          value={formValues.actors}
          error={formErrors.actors}
          options={actorsOption}
          onChange={onChangeActors}
        />
        <Tooltip title="Add Actors">
          <AddBoxIcon color="primary" onClick={() => navigate("../actors")} />
        </Tooltip>
      </Box>
      <Box sx={{ width: 800 }}>
        <FormAutoComplete
          id="categories"
          label="Categories"
          value={formValues.categories}
          error={""}
          options={categoriesOption}
          onChange={onChangeCategories}
        />
      </Box>
      <Box sx={{ width: 200 }}>
        <FormButton label="Save" onClick={onClick} />
      </Box>
      <SnackAlert
        alertData={formValues.alert}
        onClickCloseAlert={onClickCloseAlert}
      />
    </React.Fragment>
  );
};

export default MovieAddForm;
