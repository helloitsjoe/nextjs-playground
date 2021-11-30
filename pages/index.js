import { Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';
import Date from '../components/Date';
import utilStyles from '../styles/utils.module.css';
import useSWR from 'swr';
// import { getSortedPostsData } from '../lib/posts';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: { allPostsData },
//   };
// }

const fetcher = url => {
  console.log(`url:`, url);
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error('O no', res.status);
    }
    return res.json();
  });
};

const BlogList = () => {
  const { data, error } = useSWR('/api/get-posts', fetcher, {
    suspense: true,
  });

  if (error) {
    return error;
  }

  return (
    <ul className={utilStyles.list}>
      {data.posts.map(({ slug, createdAt, title }) => (
        <li key={slug} className={utilStyles.listItem}>
          <Link href={`/posts/${slug}`}>
            <a>{title}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={createdAt} />
          </small>
        </li>
      ))}
    </ul>
  );
};

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Link href="/about">
          <a>About</a>
        </Link>
      </section>
      <section>
        <h2>Blog</h2>
        <Suspense fallback="Fetching...">
          <BlogList />
        </Suspense>
      </section>
    </Layout>
  );
}
