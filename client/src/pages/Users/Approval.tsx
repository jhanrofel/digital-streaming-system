import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { usersApproval, usersApprove } from "../../utilities/slice/userSlice";

interface RowValues {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ApproveFormValues {
  id: string | number;
  approval: string;
  role: string;
  form: string;
}

const ApprovalList = () => {
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
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClickApprovedAdmin = async () => {
          const formValues: ApproveFormValues = {
            id: params.id,
            approval: "approved",
            role: "ADMIN",
            form: "approval",
          };
          await dispatch(usersApprove(formValues));
        };

        const onClickApproved = async () => {
          const formValues: ApproveFormValues = {
            id: params.id,
            approval: "approved",
            role: "USER",
            form: "approval",
          };
          await dispatch(usersApprove(formValues));
        };

        const onClickDisapproved = async () => {
          const formValues: ApproveFormValues = {
            id: params.id,
            approval: "disapproved",
            role: "USER",
            form: "approval",
          };
          await dispatch(usersApprove(formValues));
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Approved as Admin">
                <AdminPanelSettingsIcon
                  color="warning"
                  onClick={onClickApprovedAdmin}
                />
              </Tooltip>
              <Tooltip title="Approved">
                <ThumbUpIcon color="primary" onClick={onClickApproved} />
              </Tooltip>
              <Tooltip title="Disapproved">
                <ThumbDownIcon color="error" onClick={onClickDisapproved} />
              </Tooltip>
            </Stack>
          </IconButton>
        );
      },
    },
  ];
  const dispatch = useAppDispatch();
  const rows: RowValues[] = useAppSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(usersApproval());
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

export default ApprovalList;
