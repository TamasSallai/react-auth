import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAuthContext } from '../context/auth'
import GoogleIcon from '../assets/icons/google.svg'
import GitHubIcon from '../assets/icons/github.svg'
import FormGroup from '../components/FormGroup'

type RegisterForm = {
  displayName: string
  firstName?: string
  lastName?: string
  email: string
  password: string
  confirmPassword: string
}

const SignUp = () => {
  const { register: registerUser } = useAuthContext()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      displayName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')

  const onSubmit = async ({ confirmPassword, ...data }: RegisterForm) => {
    try {
      await registerUser(data)
      navigate('/home')
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
    <div className="max-w-md w-auto mx-auto px-5 flex flex-col gap-3">
      <h1 className="my-5 text-3xl font-bold sm:text-4xl">Sign Up.</h1>

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
        <span className="grow-0">or sign up with e-mail</span>
        <div className="grow h-px bg-black"></div>
      </div>

      {errors.root && (
        <p className="px-4 py-1.5 mt-2 rounded-sm outline outline-1 outline-red-700 bg-red-200 text-red-700">
          {errors.root.message}
        </p>
      )}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          id="displayName"
          label="Display Name*"
          type="text"
          {...register('displayName', {
            required: 'Display Name is required',
            minLength: {
              value: 2,
              message: 'Must be 2 or more character',
            },
          })}
          fieldError={errors.displayName}
        />

        <div className="flex flex-col gap-3 sm:flex-row ">
          <FormGroup
            id="firstName"
            label="First Name"
            type="text"
            {...register('firstName', {
              minLength: {
                value: 2,
                message: 'Must be 2 or more character',
              },
            })}
            fieldError={errors.firstName}
          />

          <FormGroup
            id="lastName"
            label="Last Name"
            type="text"
            {...register('lastName', {
              minLength: {
                value: 2,
                message: 'Must be 2 or more character',
              },
            })}
            fieldError={errors.lastName}
          />
        </div>

        <FormGroup
          id="email"
          label="E-mail*"
          type="text"
          placeholder="example@email.com"
          {...register('email', {
            required: 'E-mail is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          fieldError={errors.email}
        />

        <FormGroup
          id="password"
          label="Password*"
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

        <FormGroup
          id="confirmPassword"
          label="Confirm Password*"
          type="password"
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) =>
              value === password || 'The passwords do not match',
          })}
          fieldError={errors.confirmPassword}
        />

        <button className="mt-4 px-4 py-1.5 rounded-sm font-medium text-white bg-blue-600 hover:bg-blue-500">
          Sign Up
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{' '}
        <Link className="font-medium text-blue-600" to="/signin">
          Sign In.
        </Link>
      </p>
    </div>
  )
}

export default SignUp
