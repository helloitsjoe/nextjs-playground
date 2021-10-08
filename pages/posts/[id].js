import Head from 'next/head';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import utilStyles from '../../styles/utils.module.css';
import { getPostData } from '../../lib/posts';

const Post = ({ title, id, date, contentHtml, random }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div className={utilStyles.lightText}>Random number: {random}</div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   return { paths: getAllPostIds(), fallback: false };
// }

// export async function getStaticProps({ params }) {
//   return { props: await getPostData(params.id) };
// }

export async function getServerSideProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: { ...postData, random: Math.floor(Math.random() * 100) },
  };
}

export default Post;
