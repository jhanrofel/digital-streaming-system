import React from "react";
import { useNavigate } from "react-router-dom";
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
  formValues: FormValues;
  formErrors: FormErrors;
  actorsOption: OptionClass[];
  categoriesOption: OptionClass[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onChangeActors: any;
  onChangeCategories: any;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

interface FormValues {
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon: string;
  featured: string;
  categories: OptionClass[];
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
  actors: OptionClass[];
  alert: AlertData;
}

interface FormErrors {
  title: string;
  cost: string;
  yearReleased: string;
  banner: string;
  catalogue: string;
  actors: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

interface OptionClass {
  label: string;
  id: string;
}

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
          name="banner"
          value={formValues.banner}
          label="Banner"
          type="search"
          error={formErrors.banner}
          onChange={onChange}
        />
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
          name="facebook"
          value={formValues.facebook}
          label="Faceboook"
          type="search"
          onChange={onChange}
        />
        <FormText
          name="instagram"
          value={formValues.instagram}
          label="Instagram"
          type="search"
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", maxWidth: 800 }}>
        <FormText
          name="youtube"
          value={formValues.youtube}
          label="Youtube Channel"
          type="search"
          onChange={onChange}
        />
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
