import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MenuTop from './MenuTop';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, AlertTitle, Button, Stack, TextField, Typography } from '@mui/material';
import Auth from './AuthContext';
import { Link } from 'react-router-dom';
import { purple } from '@mui/material/colors';
import Loading from './Loading';
import axios from "axios";
import { toast } from 'react-toastify';

const colorText = purple[600];

export default function EditBook() {
  const token = useContext(Auth)
  const params = useParams()
  const Navigation = useNavigate();



  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [translator, setTranslator] = useState('')
  const [description, setDescription] = useState('')

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({});
  const [oldData, setOldData] = useState({});




  useEffect(() => {
  
  
    
  if (token.admin) {
    axios.get(`api/admin/book/${params.id}`,
      {
        headers: {
          'Authorization': `Bearer ${token.token}`,
          'Accept': 'application/json'
        }
      })
      .then(res => {
        // setOldData(res.data.data)

        setTitle(res.data.data.title)
        setAuthor(res.data.data.author)
        setTranslator(res.data.data.translator)
        setDescription(res.data.data.description)
          
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
   
  } else {
    toast.error(`دسترسی ندارید به این صفحه `, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    })

    Navigation('/')

    
  }

  },[])
  


  const submithandler = (event) => {
    event.preventDefault();
    //axios
    axios.post(`api/admin/update/book/${params.id}`, { title, translator, author, description },
      {
        headers: {
          'Authorization': `Bearer ${token.token}`,
          "Content-Type": "multipart/form-data",
          'Accept': 'application/json'

        }
      })
      .then(res => {

        console.log(res.data.error);
        

        if(!res.data.error){
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
        }

        if(res.data.error){
          Object.values(res.data.data).map(error => toast.error(`${error}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          }))
        }
        setLoading(false)
        Navigation('/listbook')
      })
      .catch(error => {
        console.log(error);
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
        Navigation('/')
      }
      )
  };
  

  return (
    <>

      {

        loading ? <Loading /> :
          token.admin ?
            <>
              <MenuTop />
              <Box component="form" sx={{ m: 5 }} onSubmit={submithandler}>
                <Grid container spacing={2}>
                  <Grid sx={{ width: '100vw', mx: 'auto', my: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 2 }} variant="h5">ویرایش  کتاب</Typography>
                  </Grid>

                  <Grid sx={{ maxWidth: '90vw', width: '50vw', mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="title"
                      label="عنوان کتاب را وارد کنید"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </Grid>
                  <Grid sx={{ maxWidth: '90vw', width: '50vw', mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="author"
                      label="نویسنده کتاب را وارد کنید"
                      name="author"
                      onChange={(e) => setAuthor(e.target.value)}
                      value={author}
                    />
                  </Grid>
                  <Grid sx={{ maxWidth: '90vw', width: '50vw', mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="translator"
                      label="مترجم کتاب را وارد کنید"
                      name="translator"
                      onChange={(e) => setTranslator(e.target.value)}
                      value={translator}
                    />
                  </Grid>
                  <Grid sx={{ maxWidth: '90vw', width: '50vw', mx: 'auto' }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="description"
                      label="متن کتاب را وارد کنید"
                      name="description"
                      rows={6}
                      multiline
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </Grid>


                  <Grid sx={{ width: '100vw', mx: 'auto', display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button variant="contained" color="primary" type='submit' sx={{ width: '300px' }}>
                      ویرایش کردن
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>
            :
            <>
              <MenuTop />

              <Stack sx={{ width: '80%', mx: 'auto', direction: 'rtl' }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>کاربر عزیز</AlertTitle>
                  شما به این قسمت از سایت دسترسی ندارید ! <strong>  <Link style={{ textDecoration: 'none', width: '100%', color: colorText }} to='/'>ورود ب صفحه اصلی</Link></strong>
                </Alert>
              </Stack>


            </>

      }
    </>

  )
}
