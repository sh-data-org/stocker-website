import { getCollection, type CollectionEntry } from 'astro:content';
import research from '../assets/research.png';
import phones from '../assets/phones.png';
import chips from '../assets/chips.png';
import retail from '../assets/stock-retail-aisle.webp';
import dataCenter from '../assets/stock-data-center.webp';
import exchange from '../assets/stock-nyse.webp';
import type { Section } from './site';

export const articleImages = {
  research,
  phones,
  chips,
  retail,
  dataCenter,
  exchange,
} as const;
export type Article = CollectionEntry<'articles'>;

export function articleUrl(article: Article): string {
  return `/${article.data.section}/${article.id}/`;
}

export async function getArticles(section?: Section): Promise<Article[]> {
  const articles = await getCollection('articles');
  return articles
    .filter((article) => !section || article.data.section === section)
    .sort((a, b) => a.data.order - b.data.order);
}

export function readingTime(body: string | undefined): number {
  return Math.max(1, Math.ceil((body ?? '').split(/\s+/).length / 200));
}
