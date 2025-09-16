import { getPublicationItem } from '@/lib/content';
import Link from 'next/link';

export default async function PublicationDetailPage({ params }: { params: { slug: string } }) {
  const item = await getPublicationItem(params.slug);

  if (!item) {
    return <div>Publication not found.</div>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{item.authors}</p>
      <p className="text-md text-gray-600 mb-4">{item.journal}, {item.year}</p>

      <div className="mt-4 flex flex-wrap gap-4 mb-8">
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-temple-red text-white font-semibold rounded-md hover:bg-red-700 transition-colors">View Publication</a>
        )}
        {item.doi && (
          <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors">DOI</a>
        )}
      </div>

      <div className="prose lg:prose-xl text-gray-800 mt-8" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
    </section>
  );
}