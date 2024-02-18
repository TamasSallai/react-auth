export interface User {
  name: string
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface AuthStateType {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  error: string | null
}

export interface AuthContextType extends AuthStateType {
  register: (input: RegisterInput) => Promise<void>
  login: (input: LoginInput) => Promise<void>
  logout: () => Promise<void>
}
