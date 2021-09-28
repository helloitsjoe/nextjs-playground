import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

const Post = ({ title, id, date }) => {
  return (
    <Layout>
      {title}
      <br />
      {id}
      <br />
      {date}
    </Layout>
  );
};

export async function getStaticPaths() {
  return { paths: getAllPostIds(), fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: getPostData(params.id) };
}

export default Post;
