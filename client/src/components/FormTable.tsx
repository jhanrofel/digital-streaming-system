import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TableTabInfo {
  label: string;
  formPages: any;
}

type AppProps = {
  tableTab: TableTabInfo[];
};

const FormTable = ({ tableTab }: AppProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Box sx={{ width: "100%", display: "static", marginTop: "100px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tableTab.map((tab, i) => (
              <Tab key={i} label={tab.label} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
        {tableTab.map((tab, i) => (
          <TabPanel key={i} value={value} index={i}>{tab.formPages}</TabPanel>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default FormTable;
