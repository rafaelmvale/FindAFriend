import { Organization, Pet, Prisma, Role } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public orgs: Organization[] = []
  public items: Pet[] = []

  async findPet(
    city: string,
    page: number,
    energy?: string | undefined,
    independency?: string | undefined,
    environment?: string | undefined,
  ): Promise<Pet[] | null> {
    const org1 = {
      id: 'organization-01',
      name: 'John Doe Org',
      email: 'johndoeorg@orgpet.com.br',
      cep: '02222333',
      address: 'street john doe',
      city: 'brooklin',
      whatsapp: '11 933333333',
      password_hash: '123456',
      role: Role.ADMIN,
      created_at: new Date(),
    }

    this.orgs.push(org1)

    const org2 = {
      id: 'organization-02',
      name: 'zezinho Org',
      email: 'zezinho@orgpet.com.br',
      cep: '02222333',
      address: 'street zezinho',
      city: 'las vegas',
      whatsapp: '11 933333333',
      password_hash: '123456',
      role: Role.ADMIN,
      created_at: new Date(),
    }
    this.orgs.push(org2)

    const filteredPets = this.items.filter((pet) => {
      const associatedOrg = this.orgs.find(
        (org) => org.id === pet.organization_id,
      )

      console.log('resultado in memory', associatedOrg)
      return (
        associatedOrg &&
        associatedOrg.city === city &&
        (!energy || pet.energyLevel === energy) &&
        (!independency || pet.IndependencyLevel === independency) &&
        (!environment || pet.environment === environment)
      )
    })

    const itemsPerPage = 10
    const startIndex = (page - 1) * itemsPerPage
    const paginatedPets = filteredPets.slice(
      startIndex,
      startIndex + itemsPerPage,
    )
    return paginatedPets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      IndependencyLevel: data.IndependencyLevel,
      environment: data.environment,
      photo: data.photo,
      requirement: data.requirement,
      organization_id: data.organization_id,
    }

    this.items.push(pet)
    console.log('pet criado', pet)
    return pet
  }
}
