import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Times() {

  const [times, setTimes] = useState(null)
  useEffect(() => {
    fetch('http://localhost:5000/datacenter/api/time')
      .then(res => res.json())
      .then(data => setTimes(data))
      .catch(err => console.log(err))
  }, [])

  return (!times ? <CircularProgress color="primary" /> :
    <div style={{ marginTop: '20px' }}>
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>Project</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Task</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>In time</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Out Time</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Duration</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Works</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              times.times.map((row, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.project}</TableCell>
                <TableCell>{row.task}</TableCell>
                <TableCell>{row.intime}</TableCell>
                <TableCell>{row.outtime}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>notes</TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
