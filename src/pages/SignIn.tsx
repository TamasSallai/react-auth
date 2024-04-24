import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAuthContext } from '../context/auth'
import FormGroup from '../components/FormGroup'
import OAuthButton from '../components/OAuthButton'
import Button from '../components/Button'
import Separator from '../components/Separator'

type SignInForm = {
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
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInForm) => {
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
    <div className="max-w-md mx-auto px-5 flex flex-col gap-4">
      <h1 className="my-5 text-3xl font-bold sm:text-4xl">Sign In.</h1>

      <OAuthButton provider="google" />
      <OAuthButton provider="github" />
      <Separator>or sign in with e-mail</Separator>

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

        <Button>Sign In</Button>
      </form>
      <p>
        Don't have and account?{' '}
        <Link className="font-medium text-blue-600" to="/signup">
          Sign Up.
        </Link>
      </p>
    </div>
  )
}

export default SignIn
