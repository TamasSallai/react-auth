import { createContext, useCallback, useEffect, useState } from 'react'
import { AuthContextType, AuthStateType, LoginInput, RegisterInput } from '.'
import axios from '../../api/axios'

const initialState: AuthStateType = {
  user: null,
  isLoggedIn: false,
  error: null,
}

const initialContext: AuthContextType = {
  ...initialState,
  register: async (_) => {},
  login: async (_) => {},
  logout: () => {},
}

export const AuthContext = createContext<AuthContextType | undefined>(
  initialContext
)

type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [{ user, isLoggedIn, error }, setState] =
    useState<AuthStateType>(initialState)

  const checkStatus = useCallback(async () => {
    try {
      const response = await axios.get('/auth/me')
      const user = response.data.user

      setState((prev) => ({
        ...prev,
        user,
        isLoggedIn: !!response.data.user,
      }))
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
      console.log(error)
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
      console.log(error)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axios.get('/auth/logout')
      checkStatus()
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
