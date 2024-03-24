import { createContext, useCallback, useEffect, useState } from 'react'
import { AuthContextType, LoginPayload, RegisterPayload, User } from '.'
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
      const response = await axios.get('/auth/profile')
      const user = response.data.user
      setUser(user)
    } catch (error) {
      setUser(null)
      setError(error)
    }
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    try {
      const response = await axios.post('/auth/register', payload)
      const user = response.data.user
      setUser(user)
    } catch (error) {
      setError(error)
    }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    try {
      const response = await axios.post('/auth/login', payload)
      const user = response.data.user
      setUser(user)
    } catch (error) {
      setError(error)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axios.get('/auth/logout')
      await checkStatus()
    } catch (error) {
      setError(error)
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
