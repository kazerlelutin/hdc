import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import { v4 as uuidv4 } from "uuid";
import didTokenDecoder from "../../utils/didTokenDecoder";
import S3 from "../../utils/s3connection";

export default async function updateAvatar(
  _source: any,
  { thumb, original, didToken }: { thumb: string; original:string; didToken: string }
) {
  try {
    const issuer = didTokenDecoder(didToken),
      s3 = new S3("hdc"),
      prisma = new PrismaClient(),
      user = await prisma.user.findUnique({
        where: {
          issuer,
        },
      });

    let avatar = `avatar-${uuidv4()}.webp`,
      isUniq = false;
    do {
      if (user.avatar) {
        const avatarArray = user.avatar.split("/");
        avatar = avatarArray[avatarArray.length - 1];
        isUniq = true;
      } else {
        const isExist = await s3.get(`/avatar/thumb/${avatar}`);

        if (isExist) {
          avatar = `avatar-${uuidv4()}.webp`;
        } else {
          isUniq = true;
        }
      }
    } while (isUniq === false);

    await prisma.user.update({
      where: {
        issuer,
      },
      data: {
        avatar: `${process.env.S3_PUBLIC_ENDPOINT.replace(
          "BUCKETNAME",
          "hdc"
        )}/avatar/size/${avatar}`,
      },
    });
    
    await s3.sendImage("avatar/thumb", thumb, avatar, "hdc");
    await s3.sendImage("avatar/original", original, avatar, "hdc");

    return await prisma.user.findUnique({
      where: {
        issuer,
      },
    });
  } catch (e) {
    throw new AuthenticationError(e);
  }
}
