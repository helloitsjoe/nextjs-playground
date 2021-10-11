import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
  // const resPosts = await fetch('/api/get-posts');
  // const posts = await resPosts.json();

  // const matterResult = matter(contents);
  const fileNames = fs.readdirSync(postsDir);

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDir, fileName);
    const contents = fs.readFileSync(fullPath);

    const matterResult = matter(contents);
    // console.log(`matterResult:`, matterResult);
    return { id, ...matterResult.data };
  });
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  });
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map(fileName => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));
};

export const getPostData = async id => {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const content = await remark().use(html).process(matterResult.content);
  const contentHtml = content.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};
