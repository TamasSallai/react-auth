import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

const initialFormValues = {
  email: '',
  password: '',
}

const SignIn = () => {
  const { login } = useAuthContext()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [formValues, setFormValues] = useState(initialFormValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormValues(initialFormValues)
    try {
      await login(formValues)
      navigate(from, { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </label>

        <button>Sign In</button>
      </form>
      <p>
        Don't have and account? <Link to="/signup">Sign Up.</Link>
      </p>
    </div>
  )
}

export default SignIn
