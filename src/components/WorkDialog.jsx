import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { forwardRef } from 'react'
import { Container } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function WorkDialog({ open, handleClose, handleOpen, work, link }) {

  let links;
  if (link) {
    links = link.split(' ')
  }
  console.log(links)

  return (
    <div>
      <Button onClick={handleOpen}>
        See work
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Container className='mt-3'>
          <h3>Work Notes</h3> <hr />
          {work}
          <h4>Links</h4>
          {
            links && links.map((l, i) => <p>Link {i + 1}: <a href={l}>{l}</a></p>)
          }
        </Container>
      </Dialog>
    </div>
  )
}
