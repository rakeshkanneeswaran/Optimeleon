import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset } from 'vitest-mock-extended'

export const prismaClientMocked = mockDeep<PrismaClient>()
export default prismaClientMocked