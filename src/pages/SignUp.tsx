import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { register as registerUser } from '../api/auth'
import { SignUpFormData, SignUpPayload } from '../types'
import FormGroup from '../components/FormGroup'
import Separator from '../components/Separator'
import OAuthButton from '../components/OAuthButton'
import Button from '../components/Button'

const SignUp = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
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

  const mutation = useMutation({
    mutationFn: (payload: SignUpPayload) => registerUser(payload),
    onSuccess: () => navigate('/home'),
    onError: (error) => {
      if (error instanceof AxiosError) {
        const data = error.response?.data // response data
        const message = data ? data.error.message : 'Something went wrong'
        setError('root', { type: 'custom', message })
      }
    },
  })

  const onSubmit = async ({
    firstName,
    lastName,
    confirmPassword,
    ...data
  }: SignUpFormData) => {
    mutation.mutate({
      ...data,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
    })
  }

  return (
    <div className="max-w-md w-auto mx-auto px-5 flex flex-col gap-4">
      <h1 className="my-5 text-3xl font-bold sm:text-4xl">Sign Up.</h1>

      <OAuthButton provider="google" />
      <OAuthButton provider="github" />
      <Separator>or sign up with e-mail</Separator>

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

        <Button style="mt-4">Sign Up</Button>
      </form>
      <p>
        Already have an account?{' '}
        <Link className="font-medium text-blue-600" to="/signin">
          Sign In.
        </Link>
      </p>
    </div>
  )
}

export default SignUp
