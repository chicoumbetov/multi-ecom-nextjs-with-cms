import { IUser } from "@/shared/domain/entities/user.interface"

export interface IUserRepository {
  getProfile(): Promise<IUser>
  toggleFavorite(productId: string): Promise<void>
}
