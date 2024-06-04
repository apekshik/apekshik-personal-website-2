import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import ParticlesBackground from '../components/ParticlesBackground';
import { truncate } from '../../utils/truncate';

export default async function Blog() {
  const allPostsData = getSortedPostsData();
  const [latestPost, ...otherPosts] = allPostsData;

  return (
    <div className="min-h-screen bg-black text-white py-12 overflow-auto relative">
      <ParticlesBackground className="absolute inset-0 z-0 backdrop-blur-lg" />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50"></div>
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-7xl font-bold text-left font-bebas">Apekshik's Blog</h1>
          <Link href="/">
            <button className="text-5xl font-bebas font-bold text-white">Go Home</button>
          </Link>
        </div>

        {/* Latest Post */}
        <div className="mb-12">
          <Link href={`/blog/${latestPost.id}`}>
            <div className="block cursor-pointer">
              {latestPost.image && (
                <img
                  src={latestPost.image}
                  alt={latestPost.title}
                  className="w-full h-128 object-cover mb-4 rounded-lg"
                />
              )}
              <div className="text-gray-400 mb-2">{latestPost.date}</div>
              <h2 className="text-6xl font-bold mb-2 text-white">
                {truncate(latestPost.title, 50)}
              </h2>
              <p className="text-gray-300 mb-4">{truncate(latestPost.excerpt, 100)}</p>
              <p className="text-gray-300">{truncate(latestPost.content.slice(0, 200), 100)}</p>
            </div>
          </Link>
        </div>

        {/* Other Posts */}
        <h2 className="text-5xl font-bold mb-8 text-left font-bebas">More Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map(({ id, date, title, content, image }) => (
            <div key={id} className="mb-8">
              <Link href={`/blog/${id}`}>
                <div className="block cursor-pointer">
                  {image && (
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-48 object-cover mb-4 rounded-lg"
                    />
                  )}
                  <div className="text-gray-400 mb-2">{date}</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {truncate(title, 50)}
                  </h3>
                  <p className="text-gray-300">{truncate(content, 100)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
