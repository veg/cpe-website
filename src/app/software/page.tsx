import { getSoftware, SoftwareItem } from '@/lib/content';
import Link from 'next/link';

export default async function SoftwarePage() {
  const software = await getSoftware();

  return (
    <section>
      <h1 className="text-5xl font-bold uppercase text-temple-red mb-6 font-mono text-shadow-retro-light">Software</h1>
      <div className="space-y-4">
        {software.map((item: SoftwareItem) => (
          <div key={item.id} className="relative bg-gray-900 text-white p-6 mb-6 border-4 border-temple-red shadow-retro-game-card transition-all duration-300 hover:shadow-retro-game-card-hover hover:scale-102">
            <Link href={`/software/${item.id}`} className="block">
              <h2 className="text-3xl font-bold uppercase text-temple-red mb-2 font-mono text-shadow-retro-light">{item.title}</h2>
            </Link>
            <p className="text-gray-300 leading-relaxed font-mono text-shadow-retro-dark">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
