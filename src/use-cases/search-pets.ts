import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetsUseCaseRequest {
  city: string
  page: number
  energy?: string
  independency?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
    energy,
    independency,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    console.log('Use Case', city)
    const pets = await this.petsRepository.findPet(
      city,
      page,
      energy,
      independency,
      environment,
    )
    if (!pets) {
      throw new ResourceNotFoundError()
    }
    console.log('return Use Case', pets)
    return {
      pets,
    }
  }
}
