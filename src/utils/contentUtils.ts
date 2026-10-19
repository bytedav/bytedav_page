import { BlogPost } from '../types';

/**
 * Generates a clean URL-friendly slug from a title or identifier
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics/accents
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+|-+$/g, ''); // trim starting and ending dashes
}

/**
 * Dynamically calculates estimated reading time from text content
 */
export function calculateReadingTime(text?: string, fallbackText?: string): string {
  const combined = `${text || ''} ${fallbackText || ''}`.trim();
  if (!combined) return '1 min';

  const wordCount = combined.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return `${minutes} min`;
}

/**
 * Normalizes a raw blog post coming from Pages CMS / JSON,
 * dynamically computing id, slug, reading time, date, and author if missing.
 */
export function normalizeBlogPost(raw: Partial<BlogPost> & { title: string; description: string }): BlogPost {
  const title = raw.title || 'Sin título';
  const description = raw.description || '';
  const content = raw.content || description;
  const id = raw.id || slugify(title);
  const slug = raw.slug || id;
  const date = raw.date || new Date().toISOString().split('T')[0];
  const readTime = raw.readTime || calculateReadingTime(content, description);
  const author = raw.author || 'bytedav.';

  return {
    id,
    slug,
    title,
    description,
    content,
    date,
    readTime,
    author,
  };
}
