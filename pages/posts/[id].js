import Head from 'next/head';
import DateDisplay from '../../components/Date';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import utilStyles from '../../styles/utils.module.css';
import { getPostData, getAllPostIds } from '../../lib/posts';

const addToDB = ({ title, slug, date, content, author }) => {
  fetch('/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, slug, date, content, author }),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error adding: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    });
};

const getAllPosts = () => {
  fetch('/api/get-posts')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error fetching: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    });
};

const Post = ({ title, id, date, contentHtml, random }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Button onClick={getAllPosts}>Get all posts</Button>
      <Button
        onClick={() =>
          addToDB({
            title,
            slug: id,
            date: new Date(date).toISOString(),
            content: contentHtml,
            // TODO: Author table
            author: 'Joe',
          })
        }
      >
        Add to DB
      </Button>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <DateDisplay dateString={date} />
        </div>
        <div className={utilStyles.lightText}>Random number: {random}</div>
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

// export async function getServerSideProps({ params }) {
//   const postData = await getPostData(params.id);
//   return {
//     props: { ...postData, random: Math.floor(Math.random() * 100) },
//   };
// }

export default Post;
