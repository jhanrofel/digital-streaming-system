import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormText from "../FormText";
import { categoriesPost } from "../../utilities/slice/categorySlice";
import { useAppDispatch } from "../../utilities/hooks";

export default function AddCategoryDialogue() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let value = (event.target as HTMLInputElement).value;

    setCategory(value);
    setError("");
  };

  const onClickSubmit = async () => {
    if (category !== "") {
      await dispatch(categoriesPost({ name: category }));
      setCategory("");
      handleClose();
    } else {
      setError("Category name required.");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Category</Button>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <FormText
            name="category"
            value={category}
            label="Input New Category"
            error={error}
            type="search"
            onChange={onChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onClickSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
