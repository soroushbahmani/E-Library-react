import React, { useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Typography from '@mui/material/Typography';
import { Card, CardActionArea, CardContent, Grid, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';





export default function ContactUs() {
    const Navigation = useNavigate();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({});
var height = Math.max(window.innerHeight);
    useEffect(() => {
        //axios 
        axios.get(`api/contact`)
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

    return (
        <div className='general' style={{height:height}}>
            {loading ? <Loading /> :
                <>
                    <MenuTop />
                    <Typography variant="h4" noWrap sx={{ mt: 4, flexGrow: 1, textAlign: 'center' }} component="div">
                       تماس با ما
                    </Typography>
                    <Grid sx={{ pt: 3, pb: 3, mx: 2, direction: 'rtl' }}>
                        <Card sx={{ width: 'calc(100% - 100px)', mx: 'auto', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} >
                            <CardActionArea sx={{ textAlign: 'right' }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 3 }}>
                                        <b> توضیحات  تماس با ما : </b>
                                    
                                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 3 }}>
                                            {data.text ? `${data.text}` : 'متن توضیحات ندارد !'}
                                        </Typography>
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 3 }}>
                                        <b> ایمیل : </b>
                                        {data.email ? <>
                                          <a style={{textDecoration:'none'}} href={`mailto:${data.email}`} target='_blank' rel="noreferrer">{data.email}</a>
                                      
                                        </> : 'لینک ایمیل ندارد !'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 3 }}>
                                        <b> موبایل : </b>
                                        {data.phone ? <>
                                          <a style={{textDecoration:'none'}} href={`tel:${data.phone}`} target='_blank' rel="noreferrer">{data.phone}</a>
                                        </> : 'شماره موبایل ندارد !'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 3 }}>
                                        <b> تلگرام : </b>
                                        {data.telegram ? <>
                                        <a style={{textDecoration:'none'}} href={`${data.telegram}`} target='_blank' rel="noreferrer">{data.telegram}</a>
                                        </> : ' لینک تلگرام ندارد !'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 3 }}>
                                        <b> لینک شبکه های اجتماعی : </b>
                                        {data.links ? <>
                                          <a style={{textDecoration:'none'}} href={`${data.links}`} target='_blank' rel="noreferrer">{data.links}</a>
                                        </> : ' لینکی ندارد !'}
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
