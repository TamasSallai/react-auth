import { useQuery } from '@tanstack/react-query'
import { me } from '@api/auth'
import { User } from '../types'

const useUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: me,
    retry: false,
  })
}

export default useUser
