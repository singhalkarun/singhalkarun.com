export type BlogSource = 'substack' | 'medium';

export interface BlogPost {
  title: string;
  description: string;
  pubDate: Date;
  link: string;
  thumbnail: string | null;
  guid: string;
  source: BlogSource;
}
