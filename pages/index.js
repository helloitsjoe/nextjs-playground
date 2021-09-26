import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

export default function Home({ allPostsData }) {
  console.log(`allPostsData:`, allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Link href="/about">
          <a>About</a>
        </Link>
        <p>TODO</p>
      </section>
      <section>
        <h2>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className={utilStyles.listItem}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
