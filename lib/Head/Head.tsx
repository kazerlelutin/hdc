import NextHead from 'next/head';
import { useRouter } from 'next/router';

interface props {
    title?: string
    type?:string
    image?:string
    description?:string
}

export default function Head({title, type,image,description}: props){
    const router = useRouter();
    
    return <NextHead>
        <meta property="og:title" content={`${title ? title + " | " : ""} Hokuto de cuisine`}/>
        <meta property="og:type" content={type ? type : "website"}/>
        <meta
        property="og:url"
        content={`https://hokutodecusine.fr/${router.asPath}`}
      />
        <meta property="og:image" content={image ? image : "/fb.webp"}/>
        <meta property="og:image:width" content="1920"/>
        <meta property="og:image:height" content="1080"/>
        <meta property="og:description" content={description ? description : "De la cuisine est des pixels"}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title ? `${title} | ` : '' } Hokuto de cuisine</title>
    </NextHead>
}