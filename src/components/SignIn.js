import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import Auth from './AuthContext';
import axios from "axios";
import Loading from './Loading';



const colorText = deepPurple[500];
const theme = createTheme();


export default function SignIn() {
  const token = useContext(Auth)
  const Navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //error
    if (data.error) {
      Navigation('/signin')

     toast.error(`${data[0]}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });

      setLoading(false)
    }
    //user
    if (data.token && !data.isAdmin) {

      toast.success(`کاربر  ${data.data}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });

      Navigation('/')
      setLoading(false)
      token.token = data.token;
      token.admin = data.isAdmin;

    }
    // admin
    if (data.token && data.isAdmin) {
      toast.success(`ادمین ${data.data} `, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      Navigation('/')
      setLoading(false)
      token.token = data.token;
      token.admin = data.isAdmin;
    }
  }, [data])




  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)

    //axios
    axios.post('api/login', { email, password })
      .then(res => setData(res.data))
      .catch(error => console.log(error))

    // Navigation('/');
  };

  return (
    <>{loading ? <Loading /> :
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            // dir='rtl'
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Link to='/'>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LoginIcon />
              </Avatar>
            </Link>
            <Typography component="h1" variant="h5">
              ورود به پنل کاربری
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <TextField
                margin="normal"

                fullWidth
                id="email"
                label="ایمیل را وارد کنید"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}


              />
              <TextField
                margin="normal"

                fullWidth
                name="password"
                label="رمز کاربری را وارد کنید"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}

              />


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ورود
              </Button>
            
                <Grid  sx={{textAlign:'center',}}>
                  <Link to='/signup' style={{ textDecoration: 'none', color: colorText, }} variant="body2">
                    {"آیا هنوز ثبت نام نکرده اید  ؟"}
                  </Link>
                </Grid>
          
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    }
    </>

  );
}
