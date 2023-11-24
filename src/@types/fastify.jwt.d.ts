import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    //  payload: { role }
    user: {
      sub: string
      role: 'ADMIN' | 'MEMBER'
    }
  }
}
