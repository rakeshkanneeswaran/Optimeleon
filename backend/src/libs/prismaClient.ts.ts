import prismaClientMocked from '../__mocks__/db';
import { PrismaClient } from '@prisma/client';


// const prismaClient = prismaClientMocked
const prismaClient = new PrismaClient();
export default prismaClient;
