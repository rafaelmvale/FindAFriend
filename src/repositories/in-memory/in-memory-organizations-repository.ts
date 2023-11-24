import { Organization, Prisma, Role } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }
    return organization
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      city: data.city,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      role: Role.ADMIN,
      created_at: new Date(),
    }

    this.items.push(organization)
    return organization
  }
}
