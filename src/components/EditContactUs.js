import React, { useContext, useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Typography from '@mui/material/Typography';
import { Button, Card, CardActionArea, CardContent, Grid, TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import Auth from './AuthContext';




export default function EditAboutUS() {
  const Navigation = useNavigate();
  const token = useContext(Auth)
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [links, setLink] = useState('')
  const [telegram, setTelegram] = useState('')


  useEffect(() => {


    axios.get(`api/contact`)
      .then(res => {
        setEmail(res.data.data.email)
        setPhone(res.data.data.phone)
        setTelegram(res.data.data.telegram)
        setText(res.data.data.text)
        setLink(res.data.data.link)
        setLoading(false)
      })
      .catch(error => {
        toast.error(`خطا با سرور`, {
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
      })


  }, [])


  const submitHandler = () => {
    setLoading(true)
    //axios
    axios.post('api/admin/contact', { text , email , phone , telegram , links },
      {
        headers: {
          'Authorization': `Bearer ${token.token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(`${res.data.data}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
      .catch(error => {
        Navigation('/')
        toast.error(`خطا با سرور`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
  }


  return (
    <>
      {loading ? <Loading /> :
        <>
          <MenuTop />
          <Typography variant="h4" noWrap sx={{ mt: 4, flexGrow: 1, textAlign: 'center' }} component="div">
            ویرایش تماس با ما
          </Typography>
          <Grid sx={{ width: '50%', my: 3, mx: 'auto', direction: 'rtl' }}>
            <TextField label="ایمیل" variant="outlined" style={{ width: '100%', margin: '15px 0' }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="شماره موبایل" variant="outlined" style={{ width: '100%', margin: '15px 0' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label=" لینک تلگرام" variant="outlined" style={{ width: '100%', margin: '15px 0' }} value={telegram} onChange={(e) => setTelegram(e.target.value)} />
            <TextField label=" لینک یک شبکه ی اجتماعی " variant="outlined" style={{ width: '100%', margin: '15px 0' }} value={links} onChange={(e) => setLink(e.target.value)} />
            <TextareaAutosize
              defaultValue={`${text}`}
              aria-label="empty textarea"
              onChange={(e) => setText(e.target.value)}
              placeholder="Empty"
              style={{ width: '100%', margin: '15px 0', padding: '20px', height: '300px', resize: 'vertical' }}
            />
            <Button variant="contained" style={{ width: '100%', margin: '15px 0 0 0' }} size='large' onClick={submitHandler}>
              ویرایش
            </Button>
          </Grid>

        </>
      }


    </>
  )
}
