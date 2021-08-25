import { Magic } from "@magic-sdk/admin";
import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";

export default async function login(
  _source: any,
  { didToken }: { didToken: string }
) {
  const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

  try {
    mAdmin.token.decode(didToken);
    const { email, issuer } = await mAdmin.users.getMetadataByToken(didToken),
      prisma = new PrismaClient(),
      { id, name, avatar } = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          issuer,
        },
      });
    return {
      email,
      issuer,
      id,
      name,
      avatar,
    };
  } catch (e) {
    throw new AuthenticationError(e);
  }
}
