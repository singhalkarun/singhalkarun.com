import { Metadata } from 'next';
import { fetchAllBlogPosts } from '@/app/lib/blogs';
import BlogCard from '@/app/components/BlogCard';
import BlogsHeader from '@/app/components/BlogsHeader';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Blogs - Karun Agarwal',
  description: 'Thoughts and writings on technology, AI, and software engineering by Karun Agarwal',
  openGraph: {
    title: 'Blogs - Karun Agarwal',
    description: 'Thoughts and writings on technology, AI, and software engineering',
    url: 'https://www.singhalkarun.com/blogs',
    type: 'website',
  },
};

export default async function BlogsPage() {
  let posts;
  let error = false;

  try {
    posts = await fetchAllBlogPosts();
  } catch (e) {
    console.error('Failed to fetch blog posts:', e);
    error = true;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pb-12 md:pb-32">
          <BlogsHeader />

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Blogs
          </h1>

          {error ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Unable to load blog posts. Please try again later.
              </p>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post) => (
                <BlogCard key={post.guid} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
