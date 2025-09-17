
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

export interface SoftwareItem {
  id: string;
  contentHtml: string;
  title: string;
  description: string;
  date: string; // Add this line
  link?: string;
  github?: string;
  google_scholar?: string;
}

export async function getSoftwareItem(slug: string): Promise<SoftwareItem> {
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
  } as SoftwareItem;
}

interface PublicationItem {
  id: string;
  contentHtml: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  date: string;
  url?: string;
  doi?: string;
}

export async function getPublicationItem(slug: string): Promise<PublicationItem> {
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
  } as PublicationItem;
}

export function getPublications(): Promise<PublicationItem[]> {
  return getContent('publications') as Promise<PublicationItem[]>;
}

export interface MemberItem {
  id: string;
  contentHtml: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  date: string; // Add this line
  google_scholar?: string;
  cv?: string;
}

export function getMembers(): Promise<MemberItem[]> {
  return getContent('members') as Promise<MemberItem[]>;
}

export interface NewsItem {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
  excerpt?: string;
}

export function getNews(): Promise<NewsItem[]> {
  return getContent('news') as Promise<NewsItem[]>;
}

export function getSoftware(): Promise<SoftwareItem[]> {
  return getContent('software') as Promise<SoftwareItem[]>;
}
