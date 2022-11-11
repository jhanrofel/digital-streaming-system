import React from "react";
import Box from "@mui/material/Box";
import { DataGrid,GridColDef } from "@mui/x-data-grid";

type AppProps = {
  rows: readonly any[];
  columns: GridColDef[];
};

const FormList = ({ rows, columns }: AppProps) => {
  return (
    <React.Fragment>
      <Box sx={{ height: 650, width: "100%" }}>
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

export default FormList;
