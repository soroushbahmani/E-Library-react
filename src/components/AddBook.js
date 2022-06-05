import React, { useContext, useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, AlertTitle, Button, Stack, TextField, Typography } from '@mui/material';
import Auth from './AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from "axios";
import { toast } from 'react-toastify';
import { purple } from '@mui/material/colors';

const colorText = purple[600];


export default function AddBook() {
    const token = useContext(Auth)
    const Navigation = useNavigate();

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [translator, setTranslator] = useState('')
    const [description, setDescription] = useState('')
    const [book, setBook] = useState(null)
    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});


    useEffect(() => {

        if ( token.admin) {
            //error
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

                //   Navigation('/signin')
                setLoading(false)
            }
            
            if (!data.error && data.data) {
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
                
                setAuthor('');
                setDescription('');
                setTitle('')
                setTranslator('')
                setBook({});
                setImage({});
                setLoading(false)
                  Navigation('/listbook')

            }
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

    }, [data])


    const submithandler = (event) => {
        event.preventDefault();
        setLoading(true)
        //axios
        axios.post('api/admin/book', {  title, translator, author, description, book, image },
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => setData(res.data))
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
        })
        Navigation('/')})
    };



    return (

        <>

            {

                loading ? <Loading /> :
                    token.admin ?
                        <>
                            <MenuTop />
                            <Box component="form" sx={{ m: 5, direction: 'rtl' }} onSubmit={submithandler}>
                                <Grid container spacing={2}>
                                    <Grid sx={{ width: '100vw', mx: 'auto', mb: 2, textAlign: 'center' }}>
                                        <Typography sx={{ mb: 2 }} variant="h5">اضافه کردن کتاب</Typography>
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
                                    <Grid sx={{ maxWidth: '90vw', width: '50vw', mx: 'auto' }}>
                                        <Typography sx={{ my: 2, display: 'block' }} variant="body">pdf اضافه کردن </Typography>

                                        <TextField
                                            type="file"
                                            variant="standard"
                                            fullWidth
                                            name="book"
                                            onChange={(e) => setBook(e.target.files[0])}

                                        />
                                        <br />
                                        <Typography sx={{ my: 2, display: 'block' }} variant="body">اضافه کردن عکس اول کتاب</Typography>
                                        <TextField
                                            fullWidth
                                            name="image"
                                            type="file"
                                            variant="standard"
                                            onChange={(e) => setImage(e.target.files[0])}

                                        />
                                        <br />
                                    </Grid>

                                    <Grid sx={{ width: '100vw', mx: 'auto', display: 'flex', justifyContent: 'center', mt: 3 }}>
                                        <Button variant="contained" color="primary" type='submit' sx={{ width: '300px' }}>
                                            اضافه کردن
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
