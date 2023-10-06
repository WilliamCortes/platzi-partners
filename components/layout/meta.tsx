import Head from 'next/head';

export const defaultMetaProps = {
  title: 'Platzi Partners',
  description: 'This is the place to search for the best that you are.',
  ogImage:
    'https://pps.whatsapp.net/v/t61.24694-24/376153218_812395623702104_3901179906043444054_n.jpg?ccb=11-4&oh=01_AdTrqx7iZWZu0FRVqsjEQRjnYb_-UhQys1MsENlBikPSXQ&oe=652D78AA&_nc_sid=000000&_nc_cat=110',
  ogUrl: 'https://www.platzi.pro/'
};

export interface MetaProps {
  title: string;
  description: string;
  ogUrl: string;
  ogImage: string;
}

export default function Meta({ props }: { props: MetaProps }) {
  return (
    <Head>
      <title>{props?.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <link rel="canonical" href={props?.ogUrl} />
      <meta name="theme-color" content="#7b46f6" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta itemProp="name" content={props?.title} />
      <meta itemProp="description" content={props?.description} />
      <meta itemProp="image" content={props?.ogImage} />
      <meta name="description" content={props?.description} />
      <meta property="og:title" content={props?.title} />
      <meta property="og:description" content={props?.description} />
      <meta property="og:url" content={props?.ogUrl} />
      <meta property="og:image" content={props?.ogImage} />
      <meta property="og:image:alt" content={props?.title} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={props?.title} />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Vercel" />
      <meta name="twitter:creator" content="@StevenTey" />
      <meta name="twitter:title" content={props?.title} />
      <meta name="twitter:description" content={props?.description} />
      <meta name="twitter:image" content={props?.ogImage} />
    </Head>
  );
}
