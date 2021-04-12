import NextHead from 'next/head';

interface props {
    title?: string,type?:string
}

export default function Head({title, type}: props){

    return <NextHead>
        <meta property="og:title" content={`${title ? title + " | " : ""} Hokuto de cuisine`}/>
        <meta property="og:type" content={type ? type : "website"}/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_VERCEL_URL}/>
        <meta property="og:image" content="https://studiokami-stock.s3.fr-par.scw.cloud/grid-battle/img/fb.png"/>
        <meta property="og:description" content="Bataille spatiale royale. Jouez à la bataille navale en temps réel contre plusieurs joueurs"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title ? `${title} | ` : '' } Hokuto de cuisine</title>
    </NextHead>
}