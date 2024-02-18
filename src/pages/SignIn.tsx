import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAuthContext } from '../context/auth'

type SignInInput = {
  email: string
  password: string
}

const SignIn = () => {
  const { login } = useAuthContext()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInInput>()

  const onSubmit = async (data: SignInInput) => {
    try {
      await login(data)
      navigate(from, { replace: true })
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error?.message
        setError('root', { type: 'custom', message })
      } else {
        setError('root', { type: 'custom', message: 'Something went wrong' })
      }
    }
  }

  const onError = () => {
    console.log('error')
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit, onError)}>
        {errors.root?.message}

        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            {...register('email', {
              required: 'E-mail is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must have 6 or more characters. ',
              },
            })}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>

        <button>Sign In</button>
      </form>
      <p>
        Don't have and account? <Link to="/signup">Sign Up.</Link>
      </p>
    </div>
  )
}

export default SignIn
