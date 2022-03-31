export default function signout() {
  localStorage.removeItem('email')
  localStorage.removeItem('name')
  localStorage.removeItem('avatar')
  localStorage.removeItem('token')
  window.location.reload()
}