import { useMutation, useQueryClient } from '@tanstack/react-query'

// DEPENDENCY INVERSION: Import the Repository (Application's Port implementation)
import { UserApiRepository } from '@/user/infrastructure/user.api.repository'

const userRepository = new UserApiRepository()

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['toggle favorite'],
    mutationFn: (productId: string) => userRepository.toggleFavorite(productId),
    onSuccess: () => {
      // Invalidate the 'profile' query to refetch updated favorites
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
  })

  // Return the mutate function and pending state for use in presentation
  return { toggleFavorite: mutate, isPending }
}