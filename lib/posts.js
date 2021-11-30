const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const matter = require('gray-matter');
const remark = require('remark');
const html = require('remark-html');

const postsDir = path.join(process.cwd(), 'posts');

const getSortedPostsData = () => {
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

const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map(fileName => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));
};

const getPostData = async id => {
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

module.exports = {
  getPostData,
  getAllPostIds,
  getSortedPostsData,
};
