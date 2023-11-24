import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationUseCase } from './register-organization'
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })
  it('should be able to register Organization', async () => {
    const { organization } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      cep: '03555000',
      address: 'john doe street ',
      city: 'São Paulo',
      whatsapp: '1199991111',
      password: '123456',
    })
    expect(organization.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      cep: '03555000',
      address: 'john doe street ',
      city: 'São Paulo',
      whatsapp: '1199991111',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jhondoe@example.com'
    await sut.execute({
      name: 'Jhon Doe',
      email,
      cep: '03555000',
      address: 'john doe street ',
      city: 'São Paulo',
      whatsapp: '1199991111',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email,
        cep: '03555000',
        address: 'john doe street ',
        city: 'São Paulo',
        whatsapp: '1199991111',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
