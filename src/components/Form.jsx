import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { projects } from './fakedata';

export default function Form() {
  const [open, setOpen] = React.useState(false);
  const [pro, setPro] = React.useState('')
  const [drop, setDrop] = React.useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleproject = e => setPro(e.target.value)

  const handlePost = () => {
    setDrop(true)

    let email = localStorage.getItem('email')
    let avatar = localStorage.getItem('avatar')

    let info = {
      project: pro,
      intime: new Date(),
      outtime: '',
      total: '',
      work: '',
      linl: '',
      email,
      avatar
    }

    fetch('http://localhost:5000/datacenter/api/time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        window.location.reload()
      })
      .catch(err => {
        alert(err.message)
        setDrop(false)
        setOpen(false)
      })

    setDrop(false)
    setOpen(false);
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={drop}
        onClick={() => setDrop(false)}
      >
        <CircularProgress color="warning" />
      </Backdrop>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Start your day!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Clock in here</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To clock in and start your day, select the project from below here and hit START.
          </DialogContentText>

          <div style={{ margin: '20px 0' }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                  value={pro}
                  autoFocus
                  label="Project"
                  onChange={handleproject}
                >
                  {
                    projects.map(project => <MenuItem key={project} value={project}>{project}</MenuItem>)
                  }


                </Select>
              </FormControl>
            </Box>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={() => handlePost()}>Start</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
