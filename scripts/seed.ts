import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer science & IT" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Stock market" },
        { name: "Engineereing" },
      ],
    });
  } catch (error) {
    console.log("[SEEDING]", error);
  }
}

main();
