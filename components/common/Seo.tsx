import Head from "next/head";
interface PageSEO {
  // Define the properties of the 'pageSEO' object
  // For example:
  title: string;
  description: string;
    websiteURL: string;
     image: string;
  // Add more properties if necessary
}

const Seo: React.FC<{ pageSEO: PageSEO }> = ({ pageSEO }) => {
  return (
    <>
      <Head>
        <title>{pageSEO.title}</title>
        <meta name="title" content={pageSEO.title} />
        <meta name="description" content={pageSEO.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageSEO.websiteURL} />
        <meta property="og:title" content={pageSEO.title} />
        <meta property="og:description" content={pageSEO.description} />
        <meta property="og:image" content={pageSEO.image} />
        <meta property="twitter:card" content={pageSEO.websiteURL} />
        <meta property="twitter:url" content={pageSEO.websiteURL} />
        <meta property="twitter:title" content={pageSEO.title} />
        <meta property="twitter:description" content={pageSEO.description} />
        <meta property="twitter:image" content={pageSEO.image} />
      </Head>
    </>
  );
};

export default Seo;
