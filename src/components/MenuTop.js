import React, { useContext, useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Auth from './AuthContext';
import axios from "axios";
import Loading from './Loading';
import { toast } from 'react-toastify';
import { grey } from '@mui/material/colors';
import { alpha, Button, InputBase } from '@mui/material';


const colorText = grey[600];
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
  const Navigation = useNavigate();
  const token = useContext(Auth)
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(data);
    if (data.data) {
      token.token = false;


      toast.error(`${data.data}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });


      Navigation('/signin')
      setLoading(false)
    }

  }, [data, loading])

  const logOutHandler = () => {

    setLoading(true)

    axios.post(
      'api/logout', null,
      {
        headers: { 'Authorization': `Bearer ${token.token}` }
      }
    ).then(res => setData(res.data)).catch(console.log);

  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };






  return (
    <>
      {loading ?
        <Loading />
        :
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} style={{ height: '65px' }}>
            <Toolbar>
           
              <Typography variant="h6" noWrap sx={{ flexGrow: 1, textAlign: 'center' }} component="div">
                کتابخانه الکترونیکی
              </Typography>


              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>


            </Toolbar>
          </AppBar>
          <Main open={open} style={{ padding: '0' }}>
            <DrawerHeader />
          </Main>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>

              <ListItem  >
                <ListItemButton>
                  <ListItemIcon>
                    < HomeIcon />
                  </ListItemIcon>
                  <ListItemText  >
                    <Link style={{ textDecoration: 'none', width: '100%', display: 'block', color: colorText }} to='/'> صفحه اصلی</Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>



              <ListItem  >
                <ListItemButton>
                  <ListItemIcon>
                    < PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText  >
                    <Link style={{ textDecoration: 'none', width: '100%', display: 'block', color: colorText }} to='/profile'>  پروفایل</Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>


              {token.admin &&
                <ListItem  >
                  <ListItemButton>
                    <ListItemIcon>
                      < MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText  >
                      <Link style={{ textDecoration: 'none', width: '100%', display: 'block', color: colorText }} to='/listbook'>مدیریت کتاب ها</Link>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              }



              <ListItem  >
                <ListItemButton>
                  <ListItemIcon>
                    < BookIcon />
                  </ListItemIcon>
                  <ListItemText  >
                    <Link style={{ textDecoration: 'none', width: '100%', display: 'block', color: colorText }} to='/bookme'>   کتابخانه ی من</Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>


              {!token.token && <ListItem  >
                <ListItemButton>
                  <ListItemIcon>
                    < HowToRegIcon />
                  </ListItemIcon>
                  <ListItemText  >
                    <Link style={{ textDecoration: 'none', width: '100%', display: 'block', color: colorText }} to='/signin'>  ورود و ثبت نام</Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              }


              {token.token &&
                <ListItem  >
                  <Button onClick={logOutHandler} style={{ textDecoration: 'none', width: '100%', display: 'block', color: colorText }} >
                    <ListItemButton>
                      <ListItemIcon>
                        < PowerSettingsNewIcon />
                      </ListItemIcon>
                      <ListItemText  >
                        خروج
                      </ListItemText>
                    </ListItemButton>
                  </Button>
                </ListItem>
              }


            </List>
            <Divider />

          </Drawer>
        </Box>
      }

    </>

  );
}
