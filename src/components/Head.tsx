import Head from "next/head";

interface HeadProps {
  title: string;
  description: string;
}

export default function IndexPage({ title, description }: HeadProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} key="description" />
      </Head>
    </>
  );
}
