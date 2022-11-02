import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { usersApproved, usersApprove } from "../../utilities/slice/userSlice";

interface RowValues {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface ApproveFormValues {
  id: string | number;
  approval: string;
  role: string;
  form: string;
}

const UserList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "role",
      headerName: "Role",
      sortable: false,
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClickRoleAdmin = async () => {
          const formValues: ApproveFormValues = {
            id: params.id,
            approval: "approved",
            role: "ADMIN",
            form: "list",
          };
          await dispatch(usersApprove(formValues));
        };

        const onClickRoleUser = async () => {
          const formValues: ApproveFormValues = {
            id: params.id,
            approval: "approved",
            role: "USER",
            form: "list",
          };
          await dispatch(usersApprove(formValues));
        };

        return (
          <IconButton>
            {params.row.role === "USER" ? (
              <Stack spacing={2} direction="row">
                <Tooltip title="Make Account as Admin">
                  <AdminPanelSettingsIcon
                    color="warning"
                    onClick={onClickRoleAdmin}
                  />
                </Tooltip>
              </Stack>
            ) : (
              <Stack spacing={2} direction="row">
                <Tooltip title="Make Account as User" >
                  <PersonIcon color="primary" onClick={onClickRoleUser}/>
                </Tooltip>
              </Stack>
            )}
          </IconButton>
        );
      },
    },
  ];
  const dispatch = useAppDispatch();
  const rows: RowValues[] = useAppSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(usersApproved());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
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
    </>
  );
};

export default UserList;
