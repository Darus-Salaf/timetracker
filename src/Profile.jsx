import { Backdrop, Button, CircularProgress, Container, Grid, TextField } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import signout from "./components/signout"

export default function Profile() {

  const [profile, setProfile] = useState({})
  const [spinner, setSpinner] = useState(false)
  let email = localStorage.getItem('email')

  useEffect(() => {
    setSpinner(true)
    fetch(`http://localhost:5000/datacenter/api/time-profile/${email}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data.user[0])
        setSpinner(false)
      })
      .catch(err => {
        alert(err.message)
        setSpinner(false)
      })
  }, [email])

  const handleSubmit = (event) => {
    setSpinner(true)
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    let info = {
      id: profile._id,
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      avatar: data.get('avatar'),
    }

    fetch('http://localhost:5000/datacenter/api/time-profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(res => {
        if (res.status === 200) {
          setSpinner(false)
          alert('Profile updated successfully. Sign in again to see effect.')
          signout()
        } else {
          alert('Failed to update profile, please try again')
          return
        }
      })
  }



  return spinner ?
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={spinner}
    ><CircularProgress color="warning" />
    </Backdrop> :
    <Container className="profile mt-2">
      <div>
        <Link to="/">
          <ArrowBackIcon fontSize="large" />
          Go to Home
        </Link>
      </div>
      <div className="center">
        <img src={profile.avatar} alt="profile" />
      </div>
      <div className="center"><h1>{profile.name}</h1></div>

      <div>
        <h2>Profile Settings</h2>
        <hr />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                defaultValue={profile.name}
              />

            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={profile.email}
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            id="password"
            defaultValue={profile.password}
          />
          <TextField
            margin="normal"
            fullWidth
            name="avatar"
            label="Avatar"
            id="avatar"
            defaultValue={profile.avatar}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Info
          </Button>
        </Box>
      </div>
    </Container>
}
