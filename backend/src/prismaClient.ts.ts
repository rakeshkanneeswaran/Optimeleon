import prismaClientMocked from './__mocks__/db';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env file
const NODE_ENV = process.env.NODE_ENV

// Type the variable explicitly
let prismaClient: PrismaClient;

if (NODE_ENV == 'test') {
  // Type assertion to ensure it matches PrismaClient type
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // Add this for debugging

  prismaClient = prismaClientMocked as PrismaClient;
} else {
  prismaClient = new PrismaClient();
}

export default prismaClient;
