import { prisma } from "../postgres.data";
import { usersSeed } from "./data";

async function main() {
  await prisma.codeVerification.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: usersSeed,
  });

  console.log("✅ Seed ejecutada correctamente");
}

(async () => {
  try {
    await main();
  } catch (err) {
    console.error("❌ Error ejecutando la seed", err);
  } finally {
    await prisma.$disconnect();
  }
})();
