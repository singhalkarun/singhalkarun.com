import Image from 'next/image';
import { BlogPost, BlogSource } from '@/app/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function SourceBadge({ source }: { source: BlogSource }) {
  const label = source === 'substack' ? 'Substack' : 'Medium';

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
      {label}
    </span>
  );
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="pb-12 border-b border-gray-200 last:border-b-0">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0">
          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="w-full md:w-48 md:flex-shrink-0">
              <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-200 mb-3">
              {post.title}
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-lg text-gray-500">{formatDate(post.pubDate)}</p>
              <SourceBadge source={post.source} />
            </div>
            {post.description && (
              <p className="text-xl lg:text-2xl leading-relaxed text-gray-800 line-clamp-3">
                {post.description}
              </p>
            )}
          </div>
        </div>
      </a>
    </article>
  );
}
