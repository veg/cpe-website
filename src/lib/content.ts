
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

async function getContent(directory: string) {
  const fullPath = path.join(contentDirectory, directory);
  const fileNames = fs.readdirSync(fullPath);
  const allData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const filePath = path.join(fullPath, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    

    return {
      id, // This will serve as the slug
      contentHtml,
      date: `${matterResult.data.year}-01-01`, // Create a date field from the year
      ...matterResult.data,
    };
  }));
  return allData;
}

export async function getSoftwareItem(slug: string) {
  const fullPath = path.join(contentDirectory, 'software', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id: slug,
    contentHtml,
    ...matterResult.data,
  };
}

export async function getPublicationItem(slug: string) {
  const fullPath = path.join(contentDirectory, 'publications', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id: slug,
    contentHtml,
    ...matterResult.data,
  };
}

export function getPublications() {
  return getContent('publications');
}

export function getMembers() {
  return getContent('members');
}

export function getNews() {
  return getContent('news');
}

export function getSoftware() {
  return getContent('software');
}
