import React, { useContext, useEffect, useState } from 'react';
import MenuTop from './MenuTop';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Book from './Book';
import Auth from './AuthContext';
import axios from "axios";
import Loading from './Loading';

import { Alert, AlertTitle, Stack } from '@mui/material';

export default function BasicGrid() {
    const token = useContext(Auth)
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)





    useEffect(() => {
        //axios
        axios.get('api/books')
            .then(res => {
                setData(res.data);
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(true)
            })
    }, [])

 console.log(data);


    return (

        <>
            {loading ? <Loading /> :

                <>
                    <MenuTop />

                    
                        <Box sx={{ mx: 'auto', mt: 2 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                            >
                                {data.map(res => <Book key={res.id} saveHide={true} token={token.token}  {...res} />)}


                            </Grid>
                        </Box>
                       






                </>
            }
        </>
    );
}


