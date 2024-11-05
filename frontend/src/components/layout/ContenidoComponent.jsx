import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import GeneralTablesForm from './FromComponent'
export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center'}}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Form" value="1" />
            <Tab label="Add Data" value="2" />
            <Tab label="Historicals" value="3" />
            <Tab label="Charts" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"><GeneralTablesForm/></TabPanel>
        <TabPanel value="2">Add Data</TabPanel>
        <TabPanel value="3">Historicals</TabPanel>
        <TabPanel value="4">Charts</TabPanel>
      </TabContext>
    </Box>
  );
}
