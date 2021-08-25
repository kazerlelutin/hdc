import { Magic } from "@magic-sdk/admin";
import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import dayjs from "dayjs";

export default async function loginByIssuer(
  _source: any,
  { token }: { token: string }
) {
  const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

  try {
    const payload = mAdmin.token.decode(token);
    //console.log(payload,dayjs.unix(payload[1].ext).format('DD-MM-YY hh:mm:ss'))
    if (dayjs(dayjs.unix(payload[1].ext)).diff(dayjs()) > 0) {
      const prisma = new PrismaClient();
      return await prisma.user.findUnique({
        where: {
          issuer: payload[1].iss,
        },
      });
    } else {
      throw new Error("non valide");
    }
  } catch (e) {
    throw new AuthenticationError(e);
  }
}
