import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';


import axios from "axios";
import Loading from './Loading';


const colorText = deepPurple[500];


const theme = createTheme();

export default function SignUp() {

  // const user = useContext(Auth)
  const Navigation = useNavigate();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.error) {
      Object.values(data.data).map(error => toast.error(`${error}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      }));
      ;

      Navigation('/signup')
      setLoading(false)
    }
    if (!data.error && data.data !== undefined) {

      toast.success(`${data.data}`, {
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
    // console.log(data);
  }, [data])

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)

    //axios
    axios.post('api/signup', { name, email, password, password_confirmation })
      .then(res => setData(res.data))
      .catch(error => console.log(error))


  };

  return (
    <>
      {loading ? <Loading /> :
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box

              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Link to='/'>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <ExitToAppIcon />
                </Avatar>
              </Link>
              <Typography component="h1" variant="h5">
                ثبت نام در سایت
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="نام را وارد کنبد"
                  name="name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  value={name}

                />
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
                <TextField
                  margin="normal"

                  fullWidth
                  name="password_confirmation"
                  label="تکرار رمز عبور را وارد کنید"
                  type="password"
                  id="password_confirmation"
                  autoComplete="current-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={password_confirmation}
                />


                <Button

                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ثبت نام
                </Button>



                <Grid sx={{ textAlign: 'center', }}>
                  <Link to='/signin' style={{ textDecoration: 'none', color: colorText }} variant="body2">
                    {"  !  ‌ورود به پنل کاربری "}
                  </Link>
                </Grid>

              </Box>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
          </Container>
        </ThemeProvider>
      }
    </>

  );
}
