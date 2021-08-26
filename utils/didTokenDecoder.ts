import { Magic } from "@magic-sdk/admin";
import dayjs from "dayjs";

export default function didTokenDecoder(didToken: string): string {
  const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);
  try {
    const payload = mAdmin.token.decode(didToken);
    //console.log(payload,dayjs.unix(payload[1].ext).format('DD-MM-YY hh:mm:ss'))
    if (dayjs(dayjs.unix(payload[1].ext)).diff(dayjs()) > 0) {
      return payload[1].iss;
    } else {
      throw new Error("non valide");
    }
  } catch (e) {
    throw new Error(e);
  }
}
