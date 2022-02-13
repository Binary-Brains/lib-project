import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Grid } from "@mui/material";
import AllLibCard from "../../pages/student/libPage/AllLibCard";
import ConnLib from "../../pages/student/libPage/ConnLib";
import { Sad } from "../Sad";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function UnstyledTabsCustomized({ data, studentData }) {
  console.log(data.libraries);
  const { connectedLibraries } = data;

  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>Connected Library</Tab>
        <Tab>View All Library</Tab>
      </TabsList>
      <TabPanel value={0}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 4, md: 12 }}
        >
          {connectedLibraries &&
            connectedLibraries.map((e, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ConnLib data={e}></ConnLib>
              </Grid>
            ))}
        </Grid>
      </TabPanel>
      <TabPanel value={1}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 4, md: 12 }}
        >
          {data && data.libraries ? (
            data.libraries.map((e, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AllLibCard data={e} studentData={studentData}></AllLibCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={4} align>
              <Sad />
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </TabsUnstyled>
  );
}
