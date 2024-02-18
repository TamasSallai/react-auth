import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth'
import { AxiosError } from 'axios'

type SignUpInput = {
  name: string
  email: string
  password: string
}

const SignUp = () => {
  const { register: registerUser } = useAuthContext()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInput>()

  const onSubmit = async (data: SignUpInput) => {
    try {
      await registerUser(data)
      navigate('/home')
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
      <h1>Sign Up</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit, onError)}>
        {errors.root?.message}

        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            {...register('name', {
              required: 'Name is required.',
              minLength: {
                value: 2,
                message: 'Name must have 2 or more character.',
              },
            })}
          />
          {errors.name && <p>{errors.name?.message}</p>}
        </div>

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
        Already have an account? <Link to="/signin">Sign In.</Link>
      </p>
    </div>
  )
}

export default SignUp
