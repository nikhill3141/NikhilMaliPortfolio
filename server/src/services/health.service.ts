import prisma from "../config/prisma.js";

export const checkDatabaseHealth = async () => {
  await prisma.$queryRaw`SELECT 1`;

  return true;
};
