import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationRequest {
  name: string
  email: string
  cep: string
  address: string
  city: string
  whatsapp: string
  password: string
}

interface RegisterOrganizationResponse {
  organization: Organization
}
export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    city,
    whatsapp,
  }: RegisterOrganizationRequest): Promise<RegisterOrganizationResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      cep,
      address,
      city,
      whatsapp,
    })
    return { organization }
  }
}
