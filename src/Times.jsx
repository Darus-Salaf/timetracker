import { useContext, useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Backdrop, Button, Typography } from "@mui/material";
import moment from "moment";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
import Form from "./Form";
import { AdminContext } from "./App";

export default function Times() {

  const [times, setTimes] = useState([])
  // eslint-disable-next-line
  const [admin, setAdmin] = useContext(AdminContext)
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

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={spinner}
      ><CircularProgress color="warning" />
      </Backdrop>
      <h1 className="center">Welcome back <span style={{ color: '#1976d2', paddingLeft: 10 }}>{localStorage.getItem('name')}</span></h1>
      <hr
        style={{ height: '2px', background: '#1976d2' }} />
      {!admin && <div className="center mt-5 mb-5"><Form /></div>}

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              {admin && <TableCell style={{ fontWeight: 'bold' }}>People</TableCell>}
              <TableCell style={{ fontWeight: 'bold' }}>Project</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Task</TableCell>
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
                <TableCell>{row.task}</TableCell>
                <TableCell><Typography style={{ fontSize: '0.7rem' }}>{moment(row.intime).format('MMM D, YYYY. h:mm a')}</Typography></TableCell>
                <TableCell><Typography style={{ fontSize: '0.7rem' }}>{row.outtime ? moment(row.outtime).format('MMM D, YYYY. h:mm a') : 'working...'}</Typography></TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>notes</TableCell>
                {!admin && !row.outtime && <TableCell><Button variant="contained" color="primary" onClick={() => handleUpdate(row._id, row.intime)}>clock out</Button></TableCell>}
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        perPage={info.perPage}
        count={info.count}
      // loading={loading}
      />
    </div>
  )
}
