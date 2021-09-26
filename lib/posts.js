import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDir, fileName);
    const contents = fs.readFileSync(fullPath);

    const matterResult = matter(contents);

    return { id, ...matterResult.data };
  });
  const rtn = allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  });
  console.log(`rtn:`, rtn);
  return rtn;
};
