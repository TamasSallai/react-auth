export interface User {
  displayName: string
  firstName?: string
  lastName?: string
  email: string
}

export interface RegisterPayload {
  displayName: string
  firstName?: string
  lastName?: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthContextType {
  user: User | null
  register: (input: RegisterPayload) => Promise<void>
  login: (input: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}
