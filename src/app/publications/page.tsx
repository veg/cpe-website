import { getPublications } from '@/lib/content';
import PublicationsList from '@/components/PublicationsList';

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Publications</h1>
      <PublicationsList publications={publications} />
    </section>
  );
}