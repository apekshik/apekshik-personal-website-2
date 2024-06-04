import { getPostBySlug, getAllPostIds } from '../../../utils/md-utils';
import ParticlesBackground from '../../components/ParticlesBackground';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

const PostPage = async ({ params }) => {
  const { contentHtml, data } = await getPostBySlug(params.slug);

  return (
    <div className="min-h-screen bg-black text-white py-12 overflow-auto relative">
      <ParticlesBackground className="absolute inset-0 z-0 backdrop-blur-lg" />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50"></div>
      <div className="max-w-3xl mx-auto px-8 py-12 relative z-10">
        <h1 className="text-6xl font-bold mb-6 text-center font-bebas">{data.title}</h1>
        <div className="font-bebas text-2xl text-gray-400 mb-4 text-center">{data.date}</div>
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-150 object-cover mb-4 rounded-lg"
          />
        )}
        <article className="prose prose-invert lg:prose-xl">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </div>
    </div>
  );
};

export default PostPage;
