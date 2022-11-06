import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormButton from "../FormButton";
import FormText from "../FormText";
import FormSelect from "../FormSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import FormAutoComplete from "../FormAutoComplete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formErrors: FormErrors;
  formValues: FormValue;
  actorsOption: OptionClass[];
  categoriesOption: OptionClass[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onChangeActors: any;
  onChangeCategories: any;
  alertData: AlertData;
  setAlertData: (value: AlertData) => void;
};

interface FormValue {
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

const optionData = ["True", "False"];

interface OptionClass {
  label: string;
  id: string;
}

const MovieEditForm = ({
  formErrors,
  formValues,
  actorsOption,
  categoriesOption,
  onClick,
  onChange,
  onChangeSelect,
  onChangeActors,
  onChangeCategories,
  alertData,
  setAlertData,
}: AppProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex", maxWidth: 600, marginTop: 10 }}>
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
        sx={{ display: "flex", maxWidth: 800, paddingTop: 2 }}
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
        <Avatar
          variant="square"
          alt="Image Banner"
          src={formValues.banner}
          sx={{ width: 65, height: 65 }}
        />
        <FormText
          name="catalogue"
          value={formValues.catalogue}
          label="Catalogue"
          type="search"
          error={formErrors.catalogue}
          onChange={onChange}
        />
        <Avatar
          variant="square"
          alt="Image Banner"
          src={formValues.catalogue}
          sx={{ width: 65, height: 65 }}
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
      <Box sx={{ display: "flex", width: 400 }}>
        <FormButton
          label="Back to List"
          onClick={() => navigate("../movies")}
        />
        <FormButton label="Save" onClick={onClick} />
      </Box>
      {/* <SnackAlert alertData={alertData} setAlertData={setAlertData} /> */}
    </>
  );
};

export default MovieEditForm;
