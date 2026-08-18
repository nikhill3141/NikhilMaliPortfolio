import { PrismaPg} from "@prisma/adapter-pg"
import {PrismaClient} from "../src/generated/prisma/client.js"
import {env} from "../src/config/env.js"
import bcrypt from "bcrypt"


const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL
})

const prisma = new PrismaClient({
  adapter
})

const main = async () => {
  const password = await bcrypt.hash(
    "Changeme!",
    12,)


  const admin = await prisma.admin.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "Nikhil",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    },
  });

  console.log("Admin created:", admin.email);

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });