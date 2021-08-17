
export default async function hello (_source: any,_get: any,{datasources}: any) {
    return {
        txt: "hello",
        status: 200
    }
}