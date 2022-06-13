import React, { useContext, useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import { Alert, AlertTitle, Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import { toast } from 'react-toastify';
import Auth from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const colorText = blue[800];

export default function Profile() {
  const token = useContext(Auth)

  const [oldpass, setoldpass] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newpass, setnewpass] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const Navigation = useNavigate();



  const newpassHandler = (event) => {
    event.preventDefault();
    setLoading(true)
    axios.post('api/change/pass', { oldpass, newpass },
      {
        headers: {
          'Authorization': `Bearer ${token.token}`,
          "Content-Type": "multipart/form-data",
          'Accept': 'application/json'
        }
      }
    )
      .then(res => {
        setData(res.data)
        setLoading(false)
        console.log(data);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    token.admin || token.token &&
    axios.get('api/info',
      {
        headers: {
          'Authorization': `Bearer ${token.token}`,
          "Content-Type": "multipart/form-data",
          'Accept': 'application/json'
        }
      }
    )
      .then(res => {
        setName(res.data.data.name)
        setEmail(res.data.data.email)
        setLoading(false)

      })
      .catch(error => console.log(error))
      
    if (data.error) {
      console.log(data);
      toast.error(`${data}`, {
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
      Navigation('/')
    }
    if (data.error === false) {
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

      setnewpass('');
      setoldpass('');
      setLoading(false)
    }
    setLoading(false)
  }, [data])


  // }
  return (


    <>
      {loading ? <Loading /> :
        <>
          {token.admin || token.token ?

            <>

              <MenuTop />
              <Box component="form" onSubmit={newpassHandler} sx={{ py: 5 }} >

                <Grid container spacing={2} flexDirection='column'>

                  <Grid sx={{ mx: 'auto', mb: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 2 }} variant="h5">پروفایل کاربر</Typography>
                  </Grid>

                  <Grid sx={{ mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="name"
                      label="نام"
                      name="name"
                      value={name}
                      disabled
                    />
                  </Grid>

                  <Grid sx={{ mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      disabled
                      id="email"
                      label="ایمیل"
                      name="email"
                      value={email}
                    />
                  </Grid>

                  <Grid sx={{ mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth

                      id="oldpass"
                      label="رمز قدیمی را را وارد کنید"
                      name="oldpass"
                      onChange={(e) => setoldpass(e.target.value)}
                      value={oldpass}
                    />

                  </Grid>
                  <Grid sx={{ mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth

                      id="newpass"
                      label="رمز جدید را را وارد کنید"
                      name="newpass"
                      onChange={(e) => setnewpass(e.target.value)}
                      value={newpass}
                    />


                  </Grid>


                  <Grid sx={{ width: '100vw', mx: 'auto', display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ width: '230px' }}>
                      تغییر کردن رمز
                    </Button>
                  </Grid>

                </Grid>

              </Box>

            </>
            :
            <>
              <MenuTop />
              <Stack sx={{ width: '80%', mx: 'auto', direction: 'rtl', mt: 4 }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>کاربر عزیز</AlertTitle>
                  شما هنوز وارد سایت نشدید ! <strong>  <Link style={{ textDecoration: 'none', width: '100%', color: colorText }} to='/signin'>ورود ب سایت</Link></strong>
                </Alert>
              </Stack>
            </>
          }
        </>
      }


    </>

  )
}
