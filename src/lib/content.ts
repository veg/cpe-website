
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export type PublicationItem = {
  id: string;
  contentHtml: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  pmid?: string;
  doi?: string;
  url?: string;
  team_members?: string[];
  keywords?: string[];
  date: string; // Derived from year
};

export type SoftwareItem = {
  id: string;
  contentHtml: string;
  title: string;
  description: string;
  github?: string;
  website?: string;
  link?: string; // Assuming 'link' might also be used for a general link
  google_scholar?: string; // Assuming this might be present for software authors
};

export type NewsItem = {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
};

export type MemberItem = {
  id: string;
  contentHtml: string;
  name: string;
  role: string;
  image: string;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  google_scholar?: string;
  cv?: string;
};

async function getContent(directory: string): Promise<any[]> {
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

export async function getSoftwareItem(slug: string): Promise<SoftwareItem | undefined> {
  const fullPath = path.join(contentDirectory, 'software', `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
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

export async function getPublicationItem(slug: string): Promise<PublicationItem | undefined> {
  const fullPath = path.join(contentDirectory, 'publications', `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id: slug,
    contentHtml,
    date: `${matterResult.data.year}-01-01`, // Ensure date is always present
    ...matterResult.data,
  } as PublicationItem;
}

export function getPublications(): Promise<PublicationItem[]> {
  return getContent('publications') as Promise<PublicationItem[]>;
}

export function getMembers(): Promise<MemberItem[]> {
  return getContent('members') as Promise<MemberItem[]>;
}

export function getNews(): Promise<NewsItem[]> {
  return getContent('news') as Promise<NewsItem[]>;
}

export function getSoftware(): Promise<SoftwareItem[]> {
  return getContent('software') as Promise<SoftwareItem[]>;
}
