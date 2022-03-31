import { forwardRef, useContext, useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Backdrop, Button, TextField, Typography } from "@mui/material";
import moment from "moment";
import Pagination from "./components/Pagination";
import { Link, useParams } from "react-router-dom";
import Form from "./components/Form";
import { AdminContext } from "./App";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Times() {

  const [times, setTimes] = useState([])
  // eslint-disable-next-line
  const [admin, setAdmin] = useContext(AdminContext)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    id: '',
    total: '',
    outtime: '',
    work: '',
    link: ''
  })

  const [info, setInfo] = useState({
    count: 0,
    perPage: 0
  })
  const [spinner, setSpinner] = useState(false)
  let { page } = useParams()
  if (page === undefined) {
    page = 1;
  }
  useEffect(() => {
    setSpinner(true)
    let email = localStorage.getItem('email')
    fetch(`http://localhost:5000/datacenter/api/gettime/${page}/${email}`)
      .then(res => res.json())
      .then(data => {
        setSpinner(false)
        setInfo({ count: data.count, perPage: data.perPage })
        return setTimes(data.response)
      })
      .catch(err => {
        console.log(err)
        setSpinner(false)
      })

  }, [page])

  const handleUpdate = (id, intime) => {
    let outtime = new Date()
    let subTotal = outtime.getTime() - new Date(intime).getTime()
    let total = (((subTotal / 1000) / 60) / 60).toFixed(2)
    let data = {
      id,
      outtime,
      total
    }

    fetch('http://localhost:5000/datacenter/api/time-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
  const handleClose = () => setOpen(false)
  const clockout = (id, intime) => {

  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={spinner}
      ><CircularProgress color="warning" />
      </Backdrop>

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>{"Clock out for your day"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Want to clock out for your day? Update your work field below. You can also provide any link for visualization of your work.
            </DialogContentText>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Work"
              name="work"
              autoFocus
              multiline
              maxRows={5}
            />
            <TextField
              fullWidth
              label="Link"
              name="link"
            />
          </DialogContent>
          <DialogActions>
            <Button color="warning" onClick={handleClose}>Cancel</Button>
            <Button color="primary" onClick={handleClose}>Clock out</Button>
          </DialogActions>
        </Dialog>
      </div>
      <h1 className="center">Welcome back <Link to='/profile' style={{ color: '#1976d2', paddingLeft: 10 }}>{localStorage.getItem('name')}</Link></h1>
      <hr
        style={{ height: '2px', background: '#1976d2' }} />
      {!admin && <div className="center mt-5 mb-5"><Form /></div>}

      <div className="ps-1 pe-1">
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                {admin && <TableCell style={{ fontWeight: 'bold' }}>People</TableCell>}
                <TableCell style={{ fontWeight: 'bold' }}>Project</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>In time</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Out Time</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Duration</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Works</TableCell>
                {!admin && <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {
                times.map((row, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                  {admin && <TableCell><Avatar src={row.avatar} /></TableCell>}
                  <TableCell>{row.project}</TableCell>
                  <TableCell><Typography style={{ fontSize: '0.7rem' }}>{moment(row.intime).format('MMM D, YYYY. h:mm a')}</Typography></TableCell>
                  <TableCell><Typography style={{ fontSize: '0.7rem' }}>{row.outtime ? moment(row.outtime).format('MMM D, YYYY. h:mm a') : 'working...'}</Typography></TableCell>
                  <TableCell>{row.total} hrs</TableCell>
                  <TableCell>notes</TableCell>
                  {!admin && !row.outtime && <TableCell><Button variant="contained" color="primary" onClick={() => clockout(row._id, row.intime)}>clock out</Button></TableCell>}
                </TableRow>)
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          page={page}
          perPage={info.perPage}
          count={info.count}
        />
      </div>
    </div>
  )
}

// handleUpdate(row._id, row.intime)