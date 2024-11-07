import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import GeneralTablesForm from './FromComponent';
import AddDataFromComponent from './AddDataFormComponent';
import HistoricalComponent from './HistoricalComponent';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <TabContext value={value}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <TabList onChange={handleChange}>
            <Tab
              label="Form"
              value="1"
              sx={{
                color: '#FFF600', // Color del tab por defecto
                '&.Mui-selected': {
                  color: '#FFF600', // Color cuando el tab está seleccionado
                },
              }}
            />
            <Tab
              label="Add Data"
              value="2"
              sx={{
                color: '#FFF600',
                '&.Mui-selected': {
                  color: '#FFF600',
                },
              }}
            />
            <Tab
              label="Historicals"
              value="3"
              sx={{
                color: '#FFF600',
                '&.Mui-selected': {
                  color: '#FFF600',
                },
              }}
            />
            {/* <Tab
              label="Charts"
              value="4"
              sx={{
                color: '#FFF600',
                '&.Mui-selected': {
                  color: '#FFF600',
                },
              }}
            /> */}
            <Tab
              label="Anual"
              value="5"
              sx={{
                color: '#FFF600',
                '&.Mui-selected': {
                  color: '#FFF600',
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1"><GeneralTablesForm /></TabPanel>
        <TabPanel value="2"><AddDataFromComponent /></TabPanel>
        <TabPanel value="3"><HistoricalComponent /></TabPanel>
        {/* <TabPanel value="4">Charts</TabPanel> */}
        <TabPanel value="5"><HistoricalComponent /></TabPanel>
      </TabContext>
    </Box>
  );
}
