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
    const [data, setData] = useState({});
    const [text, setText] = useState('')


    useEffect(() => {


        axios.get(`api/about`)
            .then(res => {
                setData(res.data.data)
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
        axios.post('api/admin/about', { text },
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
                        ویرایش درباره ی ما
                    </Typography>
                    <Grid sx={{ width: '50%', my: 3, mx: 'auto', direction: 'rtl' }}>
                        <TextareaAutosize
                            defaultValue={`${text ? text : data.text}`}
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
