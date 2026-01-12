/**
 * LookingForMore Component
 * Matching Origin Realms "Looking For More?" section exactly
 * CSS classes copied 1:1 from originrealms.com/blog/the-aether
 */
import type { BlogPost } from '../../types';
import { formatDate } from '../../utils';

interface LookingForMoreProps {
  posts: BlogPost[];
}

export default function LookingForMore({ posts }: LookingForMoreProps) {
  // Only show if we have posts to recommend
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    // Container: bg-parchment rounded-md py-10 px-6 lg:px-10 text-black mt-20
    <div className="bg-parchment rounded-md py-10 px-6 lg:px-10 text-black mt-20">
      {/* Header: pb-8 text-center */}
      <div className="pb-8 text-center">
        {/* h3: font-bold text-2xl */}
        <h3 className="font-bold text-2xl">Looking For More?</h3>
        <p>Check out some of our other blogs if you haven't already!</p>
      </div>

      {/* Cards grid: grid lg:grid-cols-2 gap-8 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {posts.map((post) => (
          // Card link: transition-transform hover:scale-95
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="transition-transform hover:scale-95"
          >
            {/* Card image: h-64 bg-center bg-cover rounded-md mb-4 */}
            <div
              className="h-64 bg-center bg-cover rounded-md mb-4 bg-gray-900"
              style={
                post.heroImage
                  ? { backgroundImage: `url("${post.heroImage}")` }
                  : undefined
              }
            />
            {/* Card title: h4 text-xl font-bold */}
            <h4 className="text-xl font-bold">{post.title}</h4>
            {/* Card meta: flex items-start font-medium text-[#603d25] */}
            <div className="flex items-start font-medium text-[#603d25]">
              {post.category && (
                <>
                  <div>{post.category}</div>
                  <div className="px-2">–</div>
                </>
              )}
              <time>{formatDate(post.pubDate)}</time>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
