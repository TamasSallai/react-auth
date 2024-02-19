import { createContext, useCallback, useEffect, useState } from 'react'
import { AuthContextType, LoginInput, RegisterInput, User } from '.'
import axios from '../../api/axios'

const initialState: AuthContextType = {
  user: null,
  register: async (_) => {},
  login: async (_) => {},
  logout: async () => {},
  error: null,
}

export const AuthContext = createContext<AuthContextType | undefined>(
  initialState
)

type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [user, setUser] = useState<User | null>(null)

  const checkStatus = useCallback(async () => {
    try {
      const response = await axios.get('/auth/me')
      const user = response.data.user
      setUser(user)
    } catch (error) {
      setError(error)
      setUser(null)
    }
  }, [])

  const register = useCallback(async (input: RegisterInput) => {
    try {
      const response = await axios.post('/auth/register', input)
      const user = response.data.user
      setUser(user)
    } catch (error) {
      setError(error)
      throw error
    }
  }, [])

  const login = useCallback(async (input: LoginInput) => {
    try {
      const response = await axios.post('/auth/login', input)
      const user = response.data.user
      setUser(user)
    } catch (error) {
      setError(error)
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axios.get('/auth/logout')
      await checkStatus()
    } catch (error) {
      setError(error)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    checkStatus().then(() => setIsLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
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
