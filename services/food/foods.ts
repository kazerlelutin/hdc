import { PrismaClient } from "@prisma/client";

export default async function foods(_source: any, {search}: {search: string}) {
  const prisma = new PrismaClient();
  const foods = await prisma.ciqual.findMany({
    take: 10,
    where: {
      name: {
        startsWith: search
      },
    },
    include: {
      season_month: true,
      diets: {
          include:{
              diet: true
          }
      }
    },
  });
  return foods;
}
