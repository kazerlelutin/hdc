import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import didTokenDecoder from "../../utils/didTokenDecoder";

export default async function updateAvatar(
  _source: any,
  { name, didToken }: { name: string, didToken: string }
) {
  try {
    const issuer = didTokenDecoder(didToken),
      prisma = new PrismaClient(),
      existName = await prisma.user.findUnique({
        where: {
          name
        },
      });

      if(existName){
          throw new Error('nom déjà utilisé')
      } else {
          return await prisma.user.update({
              where: {
                  issuer
              },data: {
                  name
              }
          })
      }
  } catch (e) {
    throw new AuthenticationError(e);
  }
}