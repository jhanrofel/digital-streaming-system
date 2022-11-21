import React from "react";
import { useAppDispatch } from "../../utilities/hooks";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { reviewsApproval } from "../../utilities/slice/reviewSlice";
import {
  IReviewFormTable,
  IReviewFormApprovePost,
} from "../../utilities/types";

type AppProps = {
  rows: IReviewFormTable[];
  formName: string;
};

const ReviewForm = ({ rows, formName }: AppProps) => {
  const dispatch = useAppDispatch();
  const columns: GridColDef[] = [
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
        const onClickApproved = async () => {
          const formValues: IReviewFormApprovePost = {
            id: params.row.id,
            approval: "approved",
          };
          await dispatch(reviewsApproval(formValues));
        };

        const onClickDisapproved = async () => {
          const formValues: IReviewFormApprovePost = {
            id: params.row.id,
            approval: "disapproved",
          };
          await dispatch(reviewsApproval(formValues));
        };
        
        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              {formName !== "disapproveReview" && (
                <Tooltip title="Disapproved">
                  <ThumbDownIcon color="error" onClick={onClickDisapproved} />
                </Tooltip>
              )}
              {formName !== "approveReview" && (
                <Tooltip title="Approved">
                  <ThumbUpIcon color="primary" onClick={onClickApproved} />
                </Tooltip>
              )}
            </Stack>
          </IconButton>
        );
      },
    },
  ];

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
        />
      </Box>
    </React.Fragment>
  );
};

export default ReviewForm;
