import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Link from '@mui/material/Link';
import Todo from './Todo'
import View from './View';

function App() {
  return (
    <div className="App " id='app'>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DarkModeIcon 
               onClick={()=>document.getElementById('app').classList=='App dark'?
                              document.getElementById('app').classList.remove('dark'):
                              document.getElementById('app').classList.add('dark')}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Unifi Solutions
          </Typography>
          <Button color="inherit" >            
              <Link className='nav-link' color="inherit" href="/view" underline="none">Weather</Link>
           </Button>
          <Button color="inherit">
              <Link className='nav-link' color="inherit"  href="/" underline="none">Todo</Link>

          </Button>

        </Toolbar>
      </AppBar>
    </Box>
     <BrowserRouter >
          <Routes>
            <Route path="/"  element={<Todo />}></Route>
            <Route path="/view"  element={<View />}></Route>

          </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
