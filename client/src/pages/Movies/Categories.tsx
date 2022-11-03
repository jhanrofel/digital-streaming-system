import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { categoriesList } from "../../utilities/slice/categorySlice";
import AddCategoryModal from "../../components/Modal/AddCategoryModal";

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
        // const onClickRoleAdmin = async () => {
        //   const formValues: ApproveFormValues = {
        //     id: params.id,
        //     approval: "approved",
        //     role: "ADMIN",
        //     form: "list",
        //   };
        //   await dispatch(usersApprove(formValues));
        // };

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
            {params.row.role === "USER" ? (
              <Stack spacing={2} direction="row">
                <Tooltip title="Make Account as Admin">
                  <AdminPanelSettingsIcon
                    color="warning"
                    // onClick={onClickRoleAdmin}
                  />
                </Tooltip>
              </Stack>
            ) : (
              <Stack spacing={2} direction="row">
                <Tooltip title="Make Account as User">
                  <PersonIcon color="primary" />
                </Tooltip>
              </Stack>
            )}
          </IconButton>
        );
      },
    },
  ];
  const dispatch = useAppDispatch();
  const rows: RowValues[] = useAppSelector((state) => state.categories.data);

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
      <AddCategoryModal />
    </>
  );
};

export default Categories;
