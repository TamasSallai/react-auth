import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAuthContext } from '../context/auth'
import GoogleIcon from '../assets/icons/google.svg'
import GitHubIcon from '../assets/icons/github.svg'
import FormGroup from '../components/FormGroup'

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
  } = useForm<SignInInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInInput) => {
    try {
      await login(data)
      navigate(from, { replace: true })
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response
          ? error.response.data.message
          : 'Something went wrong'
        setError('root', { type: 'custom', message })
      }
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 flex flex-col gap-3">
      <h1 className="my-5 text-3xl font-bold sm:text-4xl">Sign In.</h1>

      <div className="flex flex-col gap-3">
        <button className="px-4 py-1.5 flex flex-row items-center gap-3  justify-center rounded-sm outline outline-1 outline-gray-300">
          <img className="w-5 h-5" src={GoogleIcon} alt="google icon" />
          <span>Continue with Google</span>
        </button>

        <button className="px-4 py-1.5 flex flex-row items-center gap-3  justify-center rounded-sm outline outline-1 outline-gray-300">
          <img className="w-6 h-6" src={GitHubIcon} alt="github icon" />
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div className="w-100 flex flex-row items-center gap-3">
        <div className="grow h-px bg-black"></div>
        <span className="grow-0">or sign in with e-mail</span>
        <div className="grow h-px bg-black"></div>
      </div>

      {errors.root && (
        <p className="px-4 py-1.5 mt-2 rounded-sm outline outline-1 outline-red-700 bg-red-200 text-red-700">
          {errors.root.message}
        </p>
      )}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          id="email"
          label="E-mail"
          type="text"
          placeholder="example@email.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          fieldError={errors.email}
        />

        <FormGroup
          id="password"
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Must be 6 or more character',
            },
          })}
          fieldError={errors.password}
        />

        <Link className="self-end font-medium text-blue-600" to="/">
          Forgot password?
        </Link>

        <button className="mt-4 px-4 py-1.5 rounded-sm font-medium text-white bg-blue-600 hover:bg-blue-500">
          Sign In
        </button>
      </form>
      <p className="mt-2">
        Don't have and account?{' '}
        <Link className="font-medium text-blue-600" to="/signup">
          Sign Up.
        </Link>
      </p>
    </div>
  )
}

export default SignIn
