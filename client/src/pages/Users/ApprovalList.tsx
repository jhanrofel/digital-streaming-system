import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { usersApproval, usersApprove } from "../../utilities/slice/userSlice";
import { IUserFormApprovePost, IUserData } from "../../utilities/types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClickApprovedAdmin = async (): Promise<void> => {
          const formValues: IUserFormApprovePost = {
            id: params.row.id,
            approval: "approved",
            role: "ADMIN",
          };
          await dispatch(usersApprove(formValues));
        };

        const onClickApproved = async (): Promise<void> => {
          const formValues: IUserFormApprovePost = {
            id: params.row.id,
            approval: "approved",
            role: "USER",
          };
          await dispatch(usersApprove(formValues));
        };

        const onClickDisapproved = async (): Promise<void> => {
          const formValues: IUserFormApprovePost = {
            id: params.row.id,
            approval: "disapproved",
            role: "USER",
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
  const rows: IUserData[] = useAppSelector((state) => state.users.list);

  useEffect(() => {
    dispatch(usersApproval());
  }, [dispatch]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ApprovalList;
