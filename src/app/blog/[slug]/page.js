import { getAllPostIds, getPostData } from '../../../lib/posts';
import ParticlesBackground from '../../components/ParticlesBackground';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export default async function Post({ params }) {
  const postData = await getPostData(params.slug);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticlesBackground className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      <div className="max-w-3xl mx-auto px-8 py-12 relative z-10 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 text-center font-bebas">{postData.title}</h1>
        <div className="text-gray-400 mb-4 text-center">{postData.date}</div>
        <div className="prose lg:prose-xl prose-invert" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </div>
  );
}
