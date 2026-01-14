import { BlogPost, BlogSource } from '@/app/types/blog';

const FEED_URLS: Record<BlogSource, string> = {
  substack: 'https://singhalkarun.substack.com/feed',
  medium: 'https://medium.com/feed/@singhalkarun',
};

function extractThumbnail(contentEncoded: string | null, enclosure: string | null): string | null {
  // First try enclosure
  if (enclosure) {
    return enclosure;
  }

  // Then try to extract first image from content:encoded
  if (contentEncoded) {
    const imgMatch = contentEncoded.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  return null;
}

function parseRSSItem(itemXml: string, source: BlogSource): BlogPost | null {
  const getTagContent = (tag: string): string | null => {
    const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([^<]*)</${tag}>`);
    const match = itemXml.match(regex);
    return match ? (match[1] || match[2] || '').trim() : null;
  };

  const getEnclosure = (): string | null => {
    const match = itemXml.match(/<enclosure[^>]+url="([^"]+)"/);
    return match ? match[1] : null;
  };

  const title = getTagContent('title');
  const description = getTagContent('description');
  const link = getTagContent('link');
  const guid = getTagContent('guid');
  const pubDate = getTagContent('pubDate');
  const contentEncoded = getTagContent('content:encoded');
  const enclosure = getEnclosure();

  if (!title || !link) {
    return null;
  }

  // Strip HTML tags from description for cleaner display
  const cleanDescription = description
    ? description.replace(/<[^>]*>/g, '').substring(0, 300)
    : '';

  return {
    title,
    description: cleanDescription,
    link,
    guid: guid || link, // Use link as fallback for guid
    pubDate: pubDate ? new Date(pubDate) : new Date(),
    thumbnail: extractThumbnail(contentEncoded, enclosure),
    source,
  };
}

async function fetchFeed(source: BlogSource): Promise<BlogPost[]> {
  try {
    const response = await fetch(FEED_URLS[source], {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${source} feed: ${response.status}`);
      return [];
    }

    const xmlText = await response.text();

    // Extract all <item> elements
    const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g);

    if (!itemMatches) {
      return [];
    }

    const posts: BlogPost[] = [];

    for (const itemXml of itemMatches) {
      const post = parseRSSItem(itemXml, source);
      if (post) {
        posts.push(post);
      }
    }

    return posts;
  } catch (error) {
    console.error(`Error fetching ${source} feed:`, error);
    return [];
  }
}

export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  // Fetch from both sources in parallel
  const [substackPosts, mediumPosts] = await Promise.all([
    fetchFeed('substack'),
    fetchFeed('medium'),
  ]);

  // Combine and sort by date, newest first
  const allPosts = [...substackPosts, ...mediumPosts];
  allPosts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return allPosts;
}
