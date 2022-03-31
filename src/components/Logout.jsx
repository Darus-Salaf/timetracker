import { Avatar, Button } from "@mui/material";
import signout from "./signout";

export default function Logout() {

  const logout = () => {
    let isLogout = window.confirm('Sure to logout?')
    if (isLogout) {
      signout()
    }
  }

  return <div style={{ position: 'fixed', bottom: '5%', right: '5%' }}>
    <Button onClick={logout} style={{ borderRadius: '50%' }}><Avatar style={{ background: 'slateblue', fontWeight: 'bold', fontSize: '13px', height: '4rem', width: '4rem' }}>Logout</Avatar></Button>
  </div>
}
