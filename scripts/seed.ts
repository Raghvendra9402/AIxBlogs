import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Web Development" },
        { name: "Data structures" },
        { name: "Algorithms" },
        { name: "Web3" },
        { name: "UI/UX" },
      ],
    });
  } catch (error) {
    console.log("[SEEDING]", error);
  }
}

main();
