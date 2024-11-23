import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView'
import CreateUserView from './views/CreateUserView'
import { Navigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// componentes
import ContenidoComponent from './components/layout/ContenidoComponent';
import FooterComponent from './components/layout/FooterComponent';
import IndiceComponent from './components/layout/IndiceComponent';


function App() {
  return (
    <Box sx={{ display: 'flex', height: '100vh',maxHeight:'100vh', width: '100vw' }}>
      {/* Menú fijo en el lado izquierdo */}
      <Box
        sx={{
          width: '5%',
          bgcolor: '#2c2c2c',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <IndiceComponent/>
      </Box>
      
      {/* Contenedor de la sección principal */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="column" sx={{ height: '100vh' }}>
          
          {/* Title */}
          <Grid item sx={{ 
            height: '10vh', 
            bgcolor: '#1a1a1a', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            paddingLeft: '16px', 
            fontSize: '24px'
          }}>
            <h2>OnEnergy</h2>
          </Grid>
          
          {/* Content */}
          <Grid item sx={{ 
            height: '80vh', 
            bgcolor: '#1a1a1a', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            
            <Routes>
              <Route path='/login' element={<LoginView />} />
              <Route path='/create' element={<CreateUserView/>} />
              <Route path='/principal' element={<ContenidoComponent/>} />
              <Route path="*" element={<Navigate to="/principal" />} /> {/* Ruta por defecto */}
            </Routes>

          </Grid>
          
          {/* Footer */}
          <Grid item sx={{ 
            height: '10vh', 
            bgcolor: '#1a1a1a', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <FooterComponent/>
          </Grid>
          
        </Grid>
      </Box>

    </Box>
  );
}

export default App;
