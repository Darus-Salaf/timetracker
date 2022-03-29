import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from "@mui/material";
import moment from "moment";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

export default function Times() {

  const [times, setTimes] = useState(null)
  let { page } = useParams()
  if (page === undefined) {
    page = 1;
  }
  useEffect(() => {
    fetch(`http://localhost:5000/datacenter/api/gettime/${page}`)
      .then(res => res.json())
      .then(data => setTimes(data))
      .catch(err => console.log(err))

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

  return (!times ? <CircularProgress color="primary" /> :
    <div style={{ marginTop: '20px' }}>
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Project</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Task</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>In time</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Out Time</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Duration</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Works</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              times.response.map((row, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.project}</TableCell>
                <TableCell>{row.task}</TableCell>
                <TableCell><Typography style={{ fontSize: '0.7rem' }}>{moment(row.intime).format('MMM D, YYYY. h:mm a')}</Typography></TableCell>
                <TableCell>{row.outtime && moment(row.outtime).format('MMM D, YYYY. h:mm a')}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>notes</TableCell>
                {!row.outtime && <TableCell><Button variant="contained" color="primary" onClick={() => handleUpdate(row._id, row.intime)}>clock out</Button></TableCell>}
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        perPage={times.perPage}
        count={times.count}
      // loading={loading}
      />
    </div>
  )
}
