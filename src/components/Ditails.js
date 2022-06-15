import React, { useContext, useEffect, useState } from 'react'
import MenuTop from './MenuTop';
import Auth from './AuthContext';
import Loading from './Loading';
import { Alert, AlertTitle, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Menu, Stack, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { blue, purple, teal, red } from '@mui/material/colors';
import axios from 'axios';
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const colorText = blue[800];
const colorText1 = purple[600];
const colorText2 = teal[600];
const colorText3 = red[600];


export default function Ditails() {
  const token = useContext(Auth)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const [data, setData] = useState({});
  const Navigation = useNavigate();

  useEffect(() => {
    //axios

    if (token.token) {
      axios.get(`api/book/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token.token}`,
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          setData(res.data)
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


        })
    }

    else {
      setLoading(true)
      Navigation('/')
      toast.error(`کاربر عزیز شما وارد سایت نشدید`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    }

  }, [])


  var height = Math.max(window.innerHeight);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  var host = window.location.origin;



  const addLibrary = (id) => {
    //axios
    axios.post(`api/book/${id}`, null, {
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
        });
      })
      .catch(error => {
        toast.error(`سرور با خطا مواجه شده است`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      })

  }

  return (
    <div className='general' style={{height:height}}>
      {
        loading ? <Loading /> :
          token.token ?
            <>
              <MenuTop />
              <Grid sx={{ pt: 3, pb: 3, mx: 2,mt:4, direction: 'rtl' }}>
                <Card sx={{ width: 'calc(100% - 100px)', mx: 'auto', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                  <CardActionArea sx={{ textAlign: 'right' }}>
                    <CardMedia

                      sx={{ p: 1, height: "188px"}}
                      component="img"
                      image={data.data.image}
                      alt={'img ' + data.data.title + 'book'}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        <b>عنوان : </b>

                        {data.data.title ? data.data.title : 'عنوانی ندارد'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 2 }}>
                        <b>نویسنده : </b>
                        {data.data.author ? data.data.author : 'نویسنده ندارد'}

                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 2 }}>
                        <b>مترجم : </b>
                        {data.data.translator ? data.data.translator : 'مترجمی ندارد'}

                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 2 }}>
                        <b>توضیحات : </b>
                        {data.data.description ? data.data.description : 'توضیحاتی ندارد'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ display:'flex' , justifyContent:'space-around'}}>

                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="اضافه به کتابخانه" placement="right">
                        <Button onClick={() => addLibrary(data.data.id)} style={{ textDecoration: 'none', color: colorText }} variant="body2"> <BookmarkAddIcon /></Button>
                      </Tooltip>
                    </Grid>


                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="خواندن کتاب" placement="top">
                        <Link to={`/reading/${data.data.id}`} style={{ textDecoration: 'none', color: colorText1 }} variant="body2"> <MenuBookIcon /></Link>
                      </Tooltip>
                    </Grid>

                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="دانلود کتاب" placement="top">
                        <a href={data.data.path} style={{ textDecoration: 'none', color: colorText3 }} target='_blank' rel="noreferrer" download>
                          <CloudDownloadIcon />
                        </a>
                      </Tooltip>
                    </Grid>


                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="اشتراک گذاشتن" placement="left">
                        <Button id="fade-button"
                          aria-controls={open ? 'fade-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick} style={{ textDecoration: 'none', color: colorText2 }} variant="body2"> <ShareIcon /></Button>
                      </Tooltip>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={handleClose}>
                          <a target='_blank' rel="noreferrer" href={`https://wa.me/${host}/ditails/${data.data.id}`} style={{ textDecoration: 'none', color: colorText }}>whatsapp</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a target='_blank' rel="noreferrer" href={`https://telegram.me/${host}/ditails/${data.data.id}`} style={{ textDecoration: 'none', color: colorText }}>telegram</a>
                        </MenuItem>

                      </Menu>

                    </Grid>






                  </CardActions>

                </Card>
              </Grid>

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

            </>

      }
    </div>
  )
}
