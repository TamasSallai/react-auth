import { useAuthContext } from '../context/auth'

const Home = () => {
  const { user, logout } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div>
      <h1>Home</h1>
      <p>User: {JSON.stringify(user)}</p>
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default Home
