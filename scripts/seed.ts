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
        { name: "Machine Learning" },
        { name: "Artificial Intelligence" },
        { name: "Blockchain" },
        { name: "Mobile App Development" },
        { name: "Cloud Computing" },
        { name: "Cybersecurity" },
        { name: "DevOps" },
        { name: "Programming Languages" },
        { name: "System Design" },
      ],
    });
  } catch (error) {
    console.log("[SEEDING]", error);
  }
}

main();
