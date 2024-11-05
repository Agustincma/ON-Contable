import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// componentes
import ContenidoComponent from './components/layout/ContenidoComponent';

function App() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Menú fijo en el lado izquierdo */}
      <Box
        sx={{
          width: '8%',
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Typography variant="h6">Menu</Typography>
      </Box>
      
      {/* Contenedor de la sección principal */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="column" sx={{ height: '100vh' }}>
          
          {/* Title */}
          <Grid item sx={{ 
            height: '10vh', 
            bgcolor: 'secondary.black', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            paddingLeft: '16px', 
            fontSize: '24px'
          }}>
            <h2>OnContable</h2>
          </Grid>
          
          {/* Content */}
          <Grid item sx={{ 
            height: '80vh', 
            bgcolor: 'background.black', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <ContenidoComponent/>
          </Grid>
          
          {/* Footer */}
          <Grid item sx={{ 
            height: '10vh', 
            bgcolor: 'secondary.black', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              Copyright © 2015-2024
            </Typography>
          </Grid>
          
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
