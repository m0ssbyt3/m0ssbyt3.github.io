import type { CollectionEntry } from 'astro:content';

export const entrySlug = (entry: CollectionEntry<'writeups'>) =>
  entry.data.slug ?? entry.id.replace(/\.(md|mdx)$/, '');

export const byNewest = <T extends { data: { date: Date } }>(a: T, b: T) =>
  b.data.date.getTime() - a.data.date.getTime();

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' })
    .format(date)
    .toLowerCase();

export const readingTime = (body: string) =>
  `${Math.max(1, Math.round(body.trim().split(/\s+/).length / 210))} min read`;
