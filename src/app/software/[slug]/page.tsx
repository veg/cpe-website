import { getSoftwareItem } from '@/lib/content';
import Link from 'next/link';

export default async function SoftwareDetailPage({ params }: { params: { slug: string } }) {
  const item = await getSoftwareItem(params.slug);

  if (!item) {
    return <div>Software not found.</div>;
  }

  return (
    <section className="container mx-auto px-4 py-8 bg-gray-50 text-gray-800 border-4 border-gray-300 shadow-retro-ad p-8">
      <h1 className="text-5xl font-extrabold text-temple-red mb-6 uppercase font-mono text-shadow-retro">
        {item.title}
      </h1>
      <p className="text-xl text-gray-700 mb-8 font-mono leading-relaxed">
        {item.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-6 mb-12">
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-temple-red text-white font-bold uppercase text-lg font-mono border-2 border-gray-200 shadow-retro-button hover:bg-red-700 transition-colors">
            Learn More
          </a>
        )}
        {item.github && (
          <a href={item.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-dark-gray text-white font-bold uppercase text-lg font-mono border-2 border-gray-200 shadow-retro-button hover:bg-gray-700 transition-colors">
            GitHub
          </a>
        )}
        {item.google_scholar && (
          <a href={item.google_scholar} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-dark-gray text-white font-bold uppercase text-lg font-mono border-2 border-gray-200 shadow-retro-button hover:bg-gray-700 transition-colors">
            Google Scholar
          </a>
        )}
      </div>

      <div className="prose lg:prose-xl text-gray-800 font-mono" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
    </section>
  );
}