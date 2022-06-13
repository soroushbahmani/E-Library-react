import React, { useContext, useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Book from './Book';
import Auth from './AuthContext';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from './Loading';
const colorText = purple[600];




export default function BookMe() {
    const token = useContext(Auth)
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        //axios
        axios.get('api/library',
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                setData(res.data);
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(true)
            })
       
    }, [data])



    return (
        <div className='general'>
            {
                token.token ?
                    loading ? <Loading /> :

                        <>

                            <MenuTop />
                            <Box sx={{ mx: 'auto', p: 7 }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                >

                                    {data.length <= 0 ? 
                                              <Stack sx={{ width: '80%', mx: 'auto', direction: 'rtl', mt: 4 }} spacing={2}>
                                              <Alert severity="error">
                                                  <AlertTitle>کاربر عزیز</AlertTitle>
                                                  شما هیچ کتابی را ذخیره نکردید <strong>  <Link style={{ textDecoration: 'none', width: '100%', color: colorText }} to='/'> کتاب ها </Link></strong>
                                              </Alert>
                                          </Stack>
                                    :
                                    
                                    data.map((res, index) => <Book key={index} deletBook={true}  token={token.token}  {...res} />)
                                    
                                    }

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


                    </>}

        </div>
    )
}
