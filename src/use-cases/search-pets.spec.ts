import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      name: 'dog doe',
      about: 'dog dog',
      age: 'adult',
      size: 'big',
      energyLevel: 'high',
      IndependencyLevel: 'high',
      environment: 'large',
      requirement: 'nothing',
      photo: 'dogdoe.jpg',
      organization_id: 'organization-01',
    })
    await petsRepository.create({
      name: 'dog jhon',
      about: 'dog dog',
      age: 'adult',
      size: 'little',
      energyLevel: 'hard',
      IndependencyLevel: 'hard',
      environment: 'minimum',
      requirement: 'larfe place',
      photo: 'dogjhon.jpg',
      organization_id: 'organization-02',
    })

    const { pets } = await sut.execute({
      city: 'las vegas',
      page: 1,
    })
    console.log(pets)
    expect(pets).toHaveLength(1)
  })
})
