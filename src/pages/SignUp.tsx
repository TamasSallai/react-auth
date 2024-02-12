import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
}

const SignUp = () => {
  const { register } = useAuthContext()

  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(initialFormValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormValues(initialFormValues)
    try {
      await register(formValues)
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </label>
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
        Already have an account? <Link to="/signin">Sign In.</Link>
      </p>
    </div>
  )
}

export default SignUp
