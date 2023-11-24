import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsReository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationUseCase

describe('Autenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsReository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsReository)
  })

  it('should be able to authenticate organization', async () => {
    await organizationsReository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      address: 'bervely hill street',
      cep: '03344999',
      city: 'São Paulo',
      whatsapp: '1199992222',
      password_hash: await hash('123456', 6),
    })
    const { organization } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsReository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      address: 'bervely hill street',
      cep: '03344999',
      city: 'São Paulo',
      whatsapp: '1199992222',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
