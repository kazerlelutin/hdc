import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from '@magic-sdk/admin';
import dayjs from "dayjs"
const DIDToken = "WyIweGU2MDZkYWI5M2E4MmUzNGM4ZTY2YTk4MTlkNWQzN2RkNjM0YmEyNGIzZmQxNTg3OWJmMzllNjllOThiMTViOTA2N2UyYTQ5ZWY3YWZjMmQxZDA4NWZiY2E2ODIxN2U0MjNkMmFjOGM1YzNiM2U2MTE2MjVmY2I5MzlhNDE2Njc5MWIiLCJ7XCJpYXRcIjoxNjI5MjM3MDM0LFwiZXh0XCI6MTYyOTIzNzkzNCxcImlzc1wiOlwiZGlkOmV0aHI6MHgwZjI5NDYxYjVGYmFjRDIzRjQwOGE4MzVjM2I2MTU1QkUyMEEwNGFFXCIsXCJzdWJcIjpcIkxtZWZwdTRFaHFfYnEtS2pfc1JBYjF2blRBNTdWVEpzdHpQYVRlVXU3Mm89XCIsXCJhdWRcIjpcImM5YTRyc2ZJelVEYVVGNkFWZmpGX2QtYTlfM0RvUno1Y2o4OExwc0g1WGc9XCIsXCJuYmZcIjoxNjI5MjM3MDM0LFwidGlkXCI6XCI0ZTg1M2QwMS0zNGMwLTQ1Y2MtODFkNS04ZDk4NzUwY2MzMzFcIixcImFkZFwiOlwiMHhlZjRiZGQ3ZGU5ZGViMGE1OGFjMWFlNWRlNTZlNjVjYWZiN2YwZjQwZTdjNDU0NTBmOTlkYjljZGQ2OTU1NDRkNzk1YzI0MTMxNGZmY2U4NzQ4NWMyZjM1NzI5MWE3ZTI1MTYxZmZhOWMzNzg5Mjg2MWRmMWUyYzkxMzIxMDYzMjFjXCJ9Il0="

export default async (req: NextApiRequest, res: NextApiResponse) => {

       //TODO à faire coté BACK !!!!
       const mAdmin = new Magic("sk_test_8A6BD62F3E2BBF46")

       const issuer  = mAdmin.token.getIssuer(DIDToken)
       const userPublicAddress = mAdmin.token.getPublicAddress(DIDToken);
       
       const metadata = await mAdmin.users.getMetadataByPublicAddress(userPublicAddress)

       //TODO utiliser les metadata pour save dans le back.


       /**
        * login by mail
        * si non exist, create avec public adresse et email
        * save token dnas LS. 
        * 
        * pour reconnection, check le token et recup les infos. en le validant avec. 
        */

       const decode = mAdmin.token.decode(DIDToken)
    console.log( "vali",dayjs.unix(decode[1].iat).format('DD-MM-YY'), mAdmin.token.validate(DIDToken))
    

    const cool = {metadata,validate: "d",issuer,decode: mAdmin.token.decode(DIDToken)}
    res.json({
        cool
    })
  
};