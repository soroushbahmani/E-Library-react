import React, { useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Typography from '@mui/material/Typography';
import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';



 
export default function AboutUs() {
    const Navigation = useNavigate();
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState('')

var height = Math.max(window.innerHeight);
    useEffect(() => {
        //axios 
        axios.get(`api/about`)
            .then(res => {
                setText(res.data.data.text)
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

    return (
        <div className='general' style={{height:height}}>
            {loading ? <Loading /> :
                <>
                    <MenuTop />
                    <div></div>
                    <Typography variant="h4" noWrap sx={{ mt: 4, flexGrow: 1, textAlign: 'center' }} component="div">
                        درباره ی ما
                    </Typography>
                    <Grid sx={{ pt: 3, pb: 3, mx: 2, direction: 'rtl' }}>
                        <Card sx={{ width: 'calc(100% - 100px)', mx: 'auto', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} >
                            <CardActionArea sx={{ textAlign: 'right' }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 2 }}>
                                        <b> توضیحات درباره ی ما : </b>

                                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 2 }}>
                                            {text ? `${text}` : 'توضیحاتی ندارد !'}
                                        </Typography>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                </>
            }


        </div>
    )
}
