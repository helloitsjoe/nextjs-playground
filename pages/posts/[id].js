import Head from 'next/head';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';

const Post = ({ title, id, date, contentHtml }) => {
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
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  return { paths: getAllPostIds(), fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: await getPostData(params.id) };
}

export default Post;
