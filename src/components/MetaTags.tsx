import Head from "next/head";

interface MetaTagsProps {
  title: string;
  description: string;
}

const MetaTags = ({ description, title }: MetaTagsProps) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#171717" />
      <meta name="description" content={description} />
      <meta name="keywords" content="Next.js, Data Fetching, Data Fetch" />
      <meta name="author" content="Tuhin Das" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

export default MetaTags;
