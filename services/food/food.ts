import { PrismaClient } from "@prisma/client";
import { GraphQlInfo } from '../../utils/interfaces';

export default async function food(_source: any, { id }: { id: number },_context:any,info:GraphQlInfo) {
  const prisma = new PrismaClient();
  return await prisma.ciqual.findUnique({
    where: { id },
    include: {
      season_month: true,
      diets: {
        include: {
          diet: true,
        },
      },
    },
  });
}
