import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import ParticlesBackground from '../components/ParticlesBackground';

export default async function Blog() {
  const allPostsData = getSortedPostsData();
  const [latestPost, ...otherPosts] = allPostsData;

  return (
    <div className="min-h-screen bg-black text-white py-12 overflow-auto relative">
      <ParticlesBackground className="absolute inset-0 z-0 backdrop-blur-lg" />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50 "></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="text-7xl font-bold mb-12 text-left font-bebas">Apekshik's Blog</h1>
        
        {/* Latest Post */}
        <div className="mb-12">
          <Link href={`/blog/${latestPost.id}`}>
            <div className="block cursor-pointer">
              <div className="text-gray-400 mb-2">{latestPost.date}</div>
              <h2 className="text-4xl font-bold mb-2 text-white">{latestPost.title}</h2>
              <p className="text-gray-300 mb-4">{latestPost.excerpt}</p>
              <p className="text-gray-300">{latestPost.content.slice(0, 200)}...</p>
            </div>
          </Link>
        </div>
        
        {/* Other Posts */}
        <h2 className="text-5xl font-bold mb-8 text-left font-bebas">More Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map(({ id, date, title, content }) => (
            <div key={id} className="mb-8">
              <Link href={`/blog/${id}`}>
                <div className="block cursor-pointer">
                  <div className="text-gray-400 mb-2">{date}</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                  <p className="text-gray-300">{content.slice(0, 100)}...</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
