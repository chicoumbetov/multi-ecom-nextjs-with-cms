import { UserApiRepository } from '@/user/infrastructure/user.api.repository'
import { useQuery } from '@tanstack/react-query'
// import { userService } from '@/user/infrastructure/user.service'

const userRepository = new UserApiRepository()

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userRepository.getProfile()
	})

	return { user, isLoading }
}
