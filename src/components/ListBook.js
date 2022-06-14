import React, { useContext, useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, AlertTitle, Avatar, Button, Grid, Stack, TableHead } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from './AuthContext';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { purple } from '@mui/material/colors';

const colorText = purple[600];



export default function CustomPaginationActionsTable() {
    const Navigation = useNavigate();
    const token = useContext(Auth)
    const [loading, setLoading] = useState(false)

    const [list, setList] = useState([])
    const [moreList, setMoreList] = useState([])
    const [nextPageurl, setnaxtPageurl] = useState('')
    const [current_page, setcurrent_page] = useState(0)
   


    useEffect(() => {
        if (token.admin) {
            axios.get(`api/admin/books?page=1`,
                {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    setList(res.data)
                    setLoading(true)
                    setnaxtPageurl(res.data.next_page_url)
                    setcurrent_page(res.data.current_page *10 -10)

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
                    })
                    Navigation('/')
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
    }, [])


    const deleteBook = (event) => {

        setLoading(false)
        axios.post(`api/admin/delete/book/${event}`, null,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                }
            })
            .then(res => {
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
                setLoading(true)
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
                })
                Navigation('/listbook')

                console.log(error)
            })
    }


    const nextPage = () => {
        setLoading(false)

        axios.get(`${nextPageurl}`,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                console.log(res);

                setMoreList(res.data)
                setnaxtPageurl(res.data.next_page_url)
                setcurrent_page(res.data.current_page *10 -10)
                setLoading(true)
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
                })
                Navigation('/')
            })
    }
    return (
        <>
            {!loading ?
                <Loading />
                :
                token.admin ?

                    <>
                        <MenuTop />
                        <br />
                        <br />
                        <Link to='/addbook' style={{ my: 2, mx: 4, display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
                            <Button variant="contained" sx={{ mx: 4, mb: 5 }} >افزودن کتاب</Button>
                        </Link>
                        {list.data.length > 0 ?
                            <>
                                <TableContainer component={Paper} >
                                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                        <TableHead>
                                            <TableRow key='one'>
                                                <TableCell >
                                                    تعداد
                                                </TableCell>
                                                <TableCell >
                                                    عکس
                                                </TableCell>
                                                <TableCell >
                                                    عنوان کتاب
                                                </TableCell>
                                                <TableCell >
                                                    ویرایش
                                                </TableCell>
                                                <TableCell >
                                                    حذف
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <>
                                                {list.data.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell sx={{ px: 3 }}>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell >
                                                            <Avatar alt="Remy Sharp" src={row.image} />
                                                        </TableCell>

                                                        <TableCell >
                                                            {row.title}
                                                        </TableCell>
                                                        <TableCell >
                                                            <Link to={'/editbook/' + row.id} style={{ my: 2, mx: 4, display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
                                                                <IconButton aria-label="delete" size="large" color="primary">
                                                                    <EditIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell >
                                                            <IconButton aria-label="delete" size="large" color="error" onClick={() => deleteBook(row.id)}>
                                                                <DeleteIcon fontSize="inherit" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {moreList.data && moreList.data.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell sx={{ px: 3 }}>
                                                            {index+current_page+ + 1}
                                                        </TableCell>
                                                        <TableCell >
                                                            <Avatar alt="Remy Sharp" src={row.image} />
                                                        </TableCell>

                                                        <TableCell >
                                                            {row.title}
                                                        </TableCell>
                                                        <TableCell >
                                                            <Link to={'/editbook/' + row.id} style={{ my: 2, mx: 4, display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
                                                                <IconButton aria-label="delete" size="large" color="primary">
                                                                    <EditIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell >
                                                            <IconButton aria-label="delete" size="large" color="error" onClick={() => deleteBook(row.id)}>
                                                                <DeleteIcon fontSize="inherit" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}


                                            </>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {nextPageurl &&
                                    <Stack sx={{ width: '50%', mx: 'auto', my: 5, direction: 'rtl' }} spacing={2}>
                                        <Button variant="contained" onClick={nextPage}>
                                            مشاهده ی بیشتر
                                        </Button>
                                    </Stack>
                                }

                            </>
                            :
                            <Stack sx={{ width: '80%', mx: 'auto', direction: 'rtl' }} spacing={2}>
                                <Alert severity="error">
                                    <AlertTitle>کاربر عزیز</AlertTitle>
                                    شما هیچ کتابی را اضافه نکرده اید <strong>  <Link style={{ textDecoration: 'none', width: '100%', color: colorText }} to='/'>ورود ب صفحه اصلی</Link></strong>
                                </Alert>
                            </Stack>
                        }
                    </>
                    :
                    <>
                        <MenuTop />
                        <Stack sx={{ width: '80%', mx: 'auto', direction: 'rtl' }} >
                            <Alert severity="error">
                                <AlertTitle>کاربر عزیز</AlertTitle>
                                شما به این قسمت از سایت دسترسی ندارید ! <strong>  <Link style={{ textDecoration: 'none', width: '100%', color: colorText }} to='/'>ورود ب صفحه اصلی</Link></strong>
                            </Alert>
                        </Stack>
                    </>
            }

        </>

    );
}
