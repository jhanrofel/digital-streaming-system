import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  reviewsApproval,
  reviewsApprovedList,
} from "../../utilities/slice/reviewSlice";

interface RowValues {
  id: string;
  description: string;
  rating: number;
  createdAt: string;
  reviewMovie: ReviewMovie;
  reviewUser: ReviewUser;
}

interface ReviewMovie {
  title: string;
}

interface ReviewUser {
  email: string;
}

interface ApproveFormValues {
  id: string;
  approval: string;
}

const ApprovedList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return params.row.reviewMovie.title;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return params.row.reviewUser.email;
      },
    },
    {
      field: "createdAt",
      headerName: "Post date",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {

        const onClickDisapproved = async () => {
          const formValues: ApproveFormValues = {
            id: params.row.id,
            approval: "disapproved",
          };
          await dispatch(reviewsApproval(formValues));
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
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
  const rows: RowValues[] = useAppSelector((state) => state.reviews.data);

  useEffect(() => {
    dispatch(reviewsApprovedList());
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

export default ApprovedList;
