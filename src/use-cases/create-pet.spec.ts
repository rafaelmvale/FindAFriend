import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })
  it('should be able to create a pet', async () => {
    await organizationsRepository.create({
      id: 'organization-01',
      name: 'John Doe Org',
      email: 'johndoeorg@orgpet.com.br',
      cep: '02222333',
      address: 'street john doe',
      city: 'brooklin',
      whatsapp: '11 933333333',
      password_hash: '123456',
    })

    const { pet } = await sut.execute({
      name: 'dog doe',
      about: 'dog dog',
      age: 'adult',
      size: 'big',
      energyLevel: 'high',
      IndependencyLevel: 'high',
      environment: 'large',
      requirement: 'nothing',
      photo: 'dogdoe.jpg',
      organizationId: 'organization-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
