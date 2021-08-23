import { PrismaClient } from "@prisma/client";

export default async function foods(_source: any, {search}: {search: string}) {

  const prisma = new PrismaClient();
  const foods = await prisma.ciqual.findMany({
    take: 1,
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
  console.log(foods[0].diets)
  return foods;
}
