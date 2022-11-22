import React from "react";
import {
  IAutoCompleteOption,
  IObjectAny,
  IMovieForm,
} from "../../utilities/types";
import { booleanOptions } from "../../utilities/formValues";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import FormAutoComplete from "../FormAutoComplete";
import FormButton from "../FormButton";
import FormText from "../FormText";
import FormSelect from "../FormSelect";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type AppProps = {
  openMovieForm: boolean;
  formValues: IObjectAny;
  formErrors: IObjectAny;
  defaultValue: IMovieForm;
  actorsOption: IAutoCompleteOption[];
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onClickHandlerFormClose: React.MouseEventHandler<HTMLButtonElement>;
  onChangeActors: any;
  onClickHandler: any;
};

const MovieForm = ({
  openMovieForm,
  formErrors,
  defaultValue,
  formValues,
  actorsOption,
  onChangeHandler,
  onChangeSelect,
  onChangeActors,
  onClickHandlerFormClose,
  onClickHandler,
}: AppProps) => {
  return (
    <React.Fragment>
      <Modal open={openMovieForm}>
        <Box className="modalForm">
          <Box sx={{ flex: 1, width: 1, justifyContent: "flex-end" }}>
            <IconButton onClick={onClickHandlerFormClose}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormText
              name="title"
              value={defaultValue.title}
              label="Title"
              type="search"
              error={formErrors.title}
              onChange={onChangeHandler}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormText
              value={defaultValue.cost}
              name="cost"
              label="Cost"
              type=""
              error={formErrors.cost}
              onChange={onChangeHandler}
            />
            <FormText
              value={defaultValue.yearReleased}
              name="yearReleased"
              label="Year Released"
              type=""
              error={formErrors.yearReleased}
              onChange={onChangeHandler}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormSelect
              name="comingSoon"
              value={formValues.comingSoon || defaultValue.comingSoon}
              label="Coming Soon"
              options={booleanOptions}
              onChange={onChangeSelect}
            />
            <FormSelect
              name="featured"
              value={formValues.featured || defaultValue.featured}
              label="Featured"
              options={booleanOptions}
              onChange={onChangeSelect}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormText
              value={defaultValue.imageLink}
              name="imageLink"
              label="Image Link"
              type="search"
              error={formErrors.imageLink}
              onChange={onChangeHandler}
            />
            <Avatar
              variant="square"
              alt="Image Link"
              src={formValues.imageLink || defaultValue.imageLink}
              sx={{ width: 65, height: 65 }}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormText
              value={defaultValue.trailerLink}
              name="trailerLink"
              label="Trailer Link"
              type="search"
              onChange={onChangeHandler}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormAutoComplete
              id="actors"
              label="Actors"
              value={formValues.actors || defaultValue.actors}
              error={formErrors.actors}
              options={actorsOption}
              onChange={onChangeActors}
            />
            {/* <Tooltip title="Add Actors">
                <AddBoxIcon
                  color="primary"
                  onClick={() => navigate("../actors")}
                />
              </Tooltip> */}
          </Box>
          <Box sx={{ display: "flex", width: 400 }}>
            <FormButton label="Save" onClick={onClickHandler} />
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default MovieForm;
