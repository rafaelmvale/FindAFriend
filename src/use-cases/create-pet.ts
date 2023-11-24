import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  IndependencyLevel: string
  environment: string
  photo: string
  requirement: string
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    IndependencyLevel,
    environment,
    photo,
    requirement,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energyLevel,
      IndependencyLevel,
      environment,
      photo,
      requirement,
      organization_id: organizationId,
    })

    return { pet }
  }
}
