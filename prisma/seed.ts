import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const viewerRole = await prisma.role.upsert({
    where: { name: "VIEWER" },
    update: {},
    create: { name: "VIEWER" },
  });

  const analystRole = await prisma.role.upsert({
    where: { name: "ANALYST" },
    update: {},
    create: { name: "ANALYST" },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" },
  });

  // Create users
  const hashedViewerPass = await hash("viewer123", 10);
  const hashedAnalystPass = await hash("analyst123", 10);
  const hashedAdminPass = await hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "viewer@example.com" },
    update: {},
    create: {
      email: "viewer@example.com",
      passwordHash: hashedViewerPass,
      roleId: viewerRole.id,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "analyst@example.com" },
    update: {},
    create: {
      email: "analyst@example.com",
      passwordHash: hashedAnalystPass,
      roleId: analystRole.id,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      passwordHash: hashedAdminPass,
      roleId: adminRole.id,
      isActive: true,
    },
  });

  // Create sample records for admin user
  const adminUser = await prisma.user.findFirst({
    where: { role: { name: "ADMIN" } },
  });
  if (adminUser) {
    await prisma.financialRecord.createMany({
      data: [
        {
          amount: 1000,
          type: "INCOME",
          category: "Salary",
          date: new Date("2024-10-01"),
          notes: "Monthly salary",
          userId: adminUser.id,
        },
        {
          amount: 200,
          type: "EXPENSE",
          category: "Food",
          date: new Date("2024-10-02"),
          notes: "Groceries",
          userId: adminUser.id,
        },
        {
          amount: 150,
          type: "EXPENSE",
          category: "Transport",
          date: new Date("2024-10-03"),
          notes: "Fuel",
          userId: adminUser.id,
        },
        {
          amount: 500,
          type: "INCOME",
          category: "Freelance",
          date: new Date("2024-10-05"),
          notes: "Project payment",
          userId: adminUser.id,
        },
        {
          amount: 50,
          type: "EXPENSE",
          category: "Entertainment",
          date: new Date("2024-10-06"),
          notes: "Movie",
          userId: adminUser.id,
        },
      ],
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
