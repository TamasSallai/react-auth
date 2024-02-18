import { createContext, useCallback, useEffect, useState } from 'react'
import { AuthContextType, AuthStateType, LoginInput, RegisterInput } from '.'
import axios from '../../api/axios'
import { useLocation } from 'react-router-dom'

const initialState: AuthStateType = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  error: null,
}

const initialContext: AuthContextType = {
  ...initialState,
  register: async (_) => {},
  login: async (_) => {},
  logout: async () => {},
}

export const AuthContext = createContext<AuthContextType | undefined>(
  initialContext
)

type Props = {
  children: React.ReactNode
}

const errorlessPaths = ['/signin', '/signup']

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [{ user, isLoggedIn, error }, setState] =
    useState<AuthStateType>(initialState)

  const location = useLocation()

  const checkStatus = useCallback(async () => {
    try {
      const response = await axios.post('/auth/me', {
        shouldThrowError: !errorlessPaths.includes(location.pathname),
      })

      const user = response.data.user

      if (!user) {
        setState(initialContext)
      } else {
        setState((prev) => ({
          ...prev,
          user,
          isLoggedIn: !!response.data.user,
        }))
      }
    } catch (error) {
      setState(initialState)
    }
  }, [])

  const register = useCallback(async (input: RegisterInput) => {
    try {
      const response = await axios.post('/auth/register', input)
      const user = response.data.user
      setState((prev) => ({
        ...prev,
        user,
        isLoggedIn: !!response.data.user,
      }))
    } catch (error) {
      throw error
    }
  }, [])

  const login = useCallback(async (input: LoginInput) => {
    try {
      const response = await axios.post('/auth/login', input)
      const user = response.data.user

      setState((prev) => ({
        ...prev,
        user,
        isLoggedIn: !!response.data.user,
      }))
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axios.get('/auth/logout')
      await checkStatus()
    } catch (error) {
      setState(initialState)
    }
  }, [])

  useEffect(() => {
    checkStatus().then(() => setIsLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        error,
        register,
        login,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
