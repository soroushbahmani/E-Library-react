import React, { useContext, useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Auth from './AuthContext';
import Loading from './Loading';
import { Alert, AlertTitle, Stack } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { purple } from '@mui/material/colors';
import axios from 'axios';
import { toast } from 'react-toastify';
const colorText = purple[600];

export default function ReadBook() {
  const token = useContext(Auth)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const [data, setData] = useState({});
  const Navigation = useNavigate();

  useEffect(() => {
    //axios
    axios.get(`api/book/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${token.token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        setData(res.data)
        setLoading(false)

      })
      .catch(error => {
        setLoading(true)
        Navigation('/')
        toast.error(`سرور با خطا مواجه شده است`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });


      })
  }, [])
  // console.log(data.data.path);
  return (
    <>
      {
        loading ? <Loading /> :
          token.token ?
            <>
              <MenuTop />
              <iframe style={{ width: '100%', height: `calc(100vh - 75px)` }} src={data.data.path}></iframe>
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
  )
}
