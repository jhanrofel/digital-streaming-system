import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import {
  categoriesList,
  categoriesDelete,
  selectCategories,
} from "../../utilities/slice/categorySlice";
import AddCategoryDialogue from "../../components/Dialog/AddCategoryDialogue";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";

interface RowValues {
  id?: string;
  name: string;
}

const Categories = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClickDelete = async () => {
          dispatch(selectCategories(params.row.id));
          setOpen(true);
          //   const formValues: ApproveFormValues = {
          //     id: params.id,
          //     approval: "approved",
          //     role: "ADMIN",
          //     form: "list",
          //   };
          //   await dispatch(usersApprove(formValues));
        };

        // const onClickRoleUser = async () => {
        //   const formValues: ApproveFormValues = {
        //     id: params.id,
        //     approval: "approved",
        //     role: "USER",
        //     form: "list",
        //   };
        //   await dispatch(usersApprove(formValues));
        // };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Edit Category">
                <EditIcon color="primary" />
              </Tooltip>
              <Tooltip title="Delete Category">
                <DeleteIcon color="error" onClick={onClickDelete} />
              </Tooltip>
            </Stack>
          </IconButton>
        );
      },
    },
  ];
  const dispatch = useAppDispatch();
  const rows: RowValues[] = useAppSelector((state) => state.categories.data);
  const [open, setOpen] = React.useState<boolean>(false);
  const category = useAppSelector((state) => state.categories.dataOne);

  const onConfirmDelete = async () => {
    await dispatch(categoriesDelete(category.id));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(categoriesList());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </Box>
      <AddCategoryDialogue />
      <DeleteDialogue
        setOpen={setOpen}
        open={open}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
};

export default Categories;
