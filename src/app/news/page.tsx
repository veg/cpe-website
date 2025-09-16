import { getNews } from '@/lib/content';
import Link from 'next/link';

export default async function NewsPage() {
  const news = await getNews();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">News</h1>
      <div className="space-y-4">
        {news.map((item: any) => (
          <div key={item.id} className="bg-yellow-50 shadow-md p-6 mb-6 transform rotate-1 transition-transform duration-300 hover:rotate-0 hover:shadow-xl relative overflow-hidden border border-gray-300">
            {/* Optional: Torn edge effect can be simulated with pseudo-elements or SVG background */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif leading-tight">{item.title}</h2>
            <p className="text-xs text-gray-600 mb-4 uppercase tracking-wide border-b border-gray-400 pb-2">{item.date}</p>
            {item.excerpt && <p className="text-gray-800 leading-relaxed font-serif text-sm">{item.excerpt}</p>}
            <div className="mt-4 news-content text-gray-800 font-serif text-sm" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
          </div>
        ))}
      </div>
    </section>
  );
}
