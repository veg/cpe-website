import { getSoftware, SoftwareItem } from '@/lib/content';
import Link from 'next/link';

export default async function SoftwarePage() {
  const software = await getSoftware();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Software</h1>
      <div className="space-y-4">
        {software.map((item: SoftwareItem) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-shadow duration-300 hover:shadow-xl">
            <Link href={`/software/${item.id}`} className="block">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-temple-red">{item.title}</h2>
            </Link>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
