import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findPet(
    city: string,
    page: number,
    energy?: string | null,
    independency?: string | null,
    environment?: string | null,
  ): Promise<Pet[] | null> {
    const searchFilters: Prisma.PetWhereInput = {}

    if (energy) {
      searchFilters.energyLevel = energy
    }
    if (independency) {
      searchFilters.IndependencyLevel = independency
    }
    if (environment) {
      searchFilters.environment = environment
    }

    const organization = await prisma.organization.findMany({
      where: {
        city,
        pet_id: {
          some: searchFilters,
        },
      },

      include: {
        pet_id: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    const pets = organization.flatMap((org) => org.pet_id)
    return pets
  }

  async findByCharacter(
    energy?: string | undefined,
    independency?: string | undefined,
    environment?: string | undefined,
  ): Promise<Pet[] | null> {
    const searchFilters: Prisma.PetWhereInput = {}

    if (energy) {
      searchFilters.energyLevel = energy
    }
    if (independency) {
      searchFilters.IndependencyLevel = independency
    }
    if (environment) {
      searchFilters.environment = environment
    }
    const pet = await prisma.pet.findMany({
      where: searchFilters,
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
