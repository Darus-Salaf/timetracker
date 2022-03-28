import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

export default function Form() {
  const [open, setOpen] = React.useState(false);
  const [pro, setPro] = React.useState('')
  const [task, setTask] = React.useState('')
  const [work, setWork] = React.useState('')
  const [drop, setDrop] = React.useState(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleproject = event => setPro(event.target.value)
  const handletask = event => setTask(event.target.value)
  const handlework = event => setWork(event.target.value)

  const handlePost = () => {
    setDrop(true)

    let info = {
      project: pro,
      task: task,
      work: work,
      intime: new Date(),
      outtime: '',
      total: ''
    }

    fetch('http://localhost:5000/datacenter/api/time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

    setDrop(false)

    console.log('info', info)

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div style={{ margin: '10px 0' }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tasks</InputLabel>
                <Select
                  value={task}
                  label="Task"
                  onChange={handletask}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <TextField
              label="Works"
              fullWidth
              variant="standard"
              multiline
              maxRows={5}
              value={work}
              onChange={handlework}
            />
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
