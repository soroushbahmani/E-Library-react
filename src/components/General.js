import React, { useContext, useEffect, useState } from 'react';
import MenuTop from './MenuTop';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Book from './Book';
import Auth from './AuthContext';
import axios from "axios";
import Loading from './Loading';
import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { SendAndArchive } from '@mui/icons-material';



export default function BasicGrid() {
    const Navigation = useNavigate();
    const token = useContext(Auth)
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)
    const [moreList, setMoreList] = useState([])
    const [nextPageurl, setnaxtPageurl] = useState('')
    const [Search, setSearch] = useState('')


    useEffect(() => {
        //axios
        axios.get('api/books')
            .then(res => {
                setData(res.data);
                setnaxtPageurl(res.data.next_page_url)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(true)
            })
    }, [])

    useEffect(() => {
        (Search === '' || Search === null) &&

            axios.get('api/books')
                .then(res => {
                    setData(res.data);
                    setnaxtPageurl(res.data.next_page_url)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error);
                    setLoading(true)
                })

    }, [Search])



    const nextPage = () => {
        setLoading(true)
        axios.get(`${nextPageurl}`,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                setMoreList(res.data)
                setnaxtPageurl(res.data.next_page_url)
                setLoading(false)
            })
            .catch(error => {
                Navigation('/')
            })
    }

    const submithandler = (event) => {
        event.preventDefault();
        setLoading(true)
        //axios
        axios.get(`api/books/search/${Search}`)
            .then(res => {
                setData(res.data);
                setnaxtPageurl(res.data.next_page_url)
                setLoading(false)

            })
            .catch(error => {
                console.log(error);
                setLoading(true)
            })
    }
    return (

        <>
            {loading ? <Loading /> :

                <>
                    <MenuTop />
                    <Stack sx={{ width: '100%',my:5, display:'flex',justifyContent:'center',alignItems:'center' }} spacing={2}>
                        <Paper
                            onSubmit={submithandler}
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >

                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="جستوجو در کتاب ها"
                                onChange={e => setSearch(e.target.value)}
                                value={Search}
                            />
                            <IconButton type='submit' sx={{ p: '10px' }} >
                                <SearchIcon />
                            </IconButton>

                        </Paper>
                    </Stack>
                    {!data.data.length > 0 &&
                        <Stack sx={{ width: '80%', mx: 'auto', direction: 'rtl' }} spacing={2}>
                            <Alert severity="error">
                                <AlertTitle>کاربر عزیز</AlertTitle>
                                کتاب مورد نظر پیدا نشد!
                            </Alert>
                        </Stack>
                    }


                    <Box sx={{ mx: 'auto', mt: 2 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            {data.data.map(res => <Book key={res.id} saveHide={true} token={token.token}  {...res} />)}
                            {moreList.data && moreList.data.map(res => <Book key={res.id} saveHide={true} token={token.token}  {...res} />)}
                        </Grid>
                        {nextPageurl &&
                            <Stack sx={{ width: '50%', mx: 'auto', my: 5, direction: 'rtl' }} spacing={2}>
                                <Button variant="contained" onClick={nextPage}>
                                    مشاهده ی کتاب های بیشتر
                                </Button>
                            </Stack>
                        }
                    </Box>

                </>
            }
        </>
    );
}


