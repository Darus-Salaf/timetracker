import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from './App'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <span style={{ fontWeight: 'bold' }}>{'Time Tracker, '}</span> {'Copyright © '}
      <Link color="primary" href="https://fb.com/rabibinsalam">
        Rabius Sunny
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Login() {

  const navigate = useNavigate()
  // eslint-disable-next-line
  const [admin, setAdmin] = React.useContext(AdminContext)
  const [spinner, setSpinner] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSpinner(true)
    const data = new FormData(event.currentTarget)

    let info = {
      email: data.get('email'),
      password: data.get('password'),
      code: data.get('code'),
    }
    fetch('https://darulislam.foundation/datacenter/api/time/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(res => {
        if (res.status !== 200) {
          alert('Incorrect Credentials, Please try again.')
          return
        } else {
          return res.json()
        }
      })
      .then(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('avatar', data.avatar)
        localStorage.setItem('name', data.name)
        if (data.email === 'razibahmed@gmail.com') {
          setAdmin(true)
        }
        setSpinner(false)
        navigate('/')
        window.location.reload()
      })
      .catch(err => {
        setSpinner(false)
        console.log(err)
      })
  }

  return <Container maxWidth="xs">
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={spinner}
    ><CircularProgress color="primary" />
    </Backdrop>

    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#130568',
        pt: 3, pb: 5, pr: 3, pl: 3,
        borderRadius: 5
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography style={{ color: 'white' }} component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          className='login'
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          className='login'
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="code"
          label="Code"
          type="password"
          id="code"
          className='login'
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </Container >
}