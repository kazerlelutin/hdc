import { Magic } from 'magic-sdk';

const m = ()=> new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)

export default m()
