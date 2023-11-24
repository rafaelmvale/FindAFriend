import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findPet(
    city: string,
    page: number,
    energy?: string,
    independency?: string,
    environment?: string,
  ): Promise<Pet[] | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
