import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GeneralTablesForm from './FromComponent';
import AddDataFromComponent from './AddDataFormComponent';
import HistoricalComponent from './HistoricalComponent';
import FormIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import PercentageTable from './AnualDataComponent';
import BarChart from './BarChart'

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <TabContext value={value}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <TabList
            onChange={handleChange}
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#1a1a1a' },
            }}
          >
            <Tab
              icon={<FormIcon fontSize="small" sx={{ color: "#fff" }} />}
              iconPosition="start"
              label="Form"
              value="1"
              sx={{
                color: '#FFF600',
                backgroundColor: '#1a1a1a',
                borderRadius: '30px',
                ml: 1,
                height: '40px',
                minHeight: '40px',
                fontSize: '0.75rem',
                border: 'none',
                '&:focus': { outline: 'none' }, // Eliminar borde al enfocar
                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#6F6E6E',
                },
              }}
            />
            <Tab
              icon={<AddIcon fontSize="small" sx={{ color: "#fff" }} />}
              iconPosition="start"
              label="Add Data"
              value="2"
              sx={{
                color: '#FFF600',
                backgroundColor: '#1a1a1a',
                borderRadius: '30px',
                ml: 1,
                height: '40px',
                minHeight: '40px',
                fontSize: '0.75rem',
                border: 'none',
                '&:focus': { outline: 'none' },
                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#6F6E6E',
                },
              }}
            />
            <Tab
              icon={<HistoryIcon fontSize="small" sx={{ color: "#fff" }} />}
              iconPosition="start"
              label="Historicals"
              value="3"
              sx={{
                color: '#FFF600',
                backgroundColor: '#1a1a1a',
                borderRadius: '30px',
                ml: 1,
                height: '40px',
                minHeight: '40px',
                fontSize: '0.75rem',
                border: 'none',
                '&:focus': { outline: 'none' },
                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#6F6E6E',
                },
              }}
            />
            <Tab
              icon={<BarChartIcon fontSize="small" sx={{ color: "#fff" }} />}
              iconPosition="start"
              label="Anual"
              value="4"
              sx={{
                color: '#FFF600',
                backgroundColor: '#1a1a1a',
                borderRadius: '30px',
                ml: 1,
                height: '40px',
                minHeight: '40px',
                fontSize: '0.75rem',
                border: 'none',
                '&:focus': { outline: 'none' },
                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#6F6E6E',
                },
              }}
            />
            <Tab
              icon={<BarChartIcon fontSize="small" sx={{ color: "#fff" }} />}
              iconPosition="start"
              label="Charts"
              value="5"
              sx={{
                color: '#FFF600',
                backgroundColor: '#1a1a1a',
                borderRadius: '30px',
                ml: 1,
                height: '40px',
                minHeight: '40px',
                fontSize: '0.75rem',
                border: 'none',
                '&:focus': { outline: 'none' },
                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#6F6E6E',
                },
              }}
            />
          </TabList>
        </Box>
        {/* Transición entre los TabPanel */}
        <TabPanel value="1" sx={{ transition: 'opacity 0.5s ease', opacity: value === '1' ? 1 : 0 }}>
          <GeneralTablesForm />
        </TabPanel>
        <TabPanel value="2" sx={{ transition: 'opacity 0.5s ease', opacity: value === '2' ? 1 : 0 }}>
          <AddDataFromComponent />
        </TabPanel>
        <TabPanel value="3" sx={{ transition: 'opacity 0.5s ease', opacity: value === '3' ? 1 : 0 }}>
          <HistoricalComponent />
        </TabPanel>
        <TabPanel value="4" sx={{ transition: 'opacity 0.5s ease', opacity: value === '4' ? 1 : 0 }}>
          <PercentageTable />
        </TabPanel>
        <TabPanel value="5" sx={{ transition: 'opacity 0.5s ease', opacity: value === '5' ? 1 : 0 }}>
          <BarChart/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
