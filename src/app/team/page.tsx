import { getMembers } from '@/lib/content';
// import Image from 'next/image'; // No longer needed

export default async function TeamPage() {
  const members = await getMembers();

  // Sort members: directors first, then by name
  const sortedMembers = members.sort((a: any, b: any) => {
    if (a.role === 'Co-director' && b.role !== 'Co-director') {
      return -1;
    }
    if (a.role !== 'Co-director' && b.role === 'Co-director') {
      return 1;
    }
    return a.name.localeCompare(b.name); // Sort alphabetically by name for others
  });

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 text-center">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {sortedMembers.map((member: any) => (
          <div key={member.id} className="bg-dark-gray text-white p-6 rounded-lg shadow-xl border-2 border-temple-red flex flex-col items-center text-center font-mono relative overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-temple-red"></div>
            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-temple-red"></div>

            <img
              src={member.avatar}
              alt={`Photo of ${member.name}`}
              width={150}
              height={150}
              className="rounded-full mb-4 object-cover border-4 border-gray-600 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-temple-red"
            />
            <h2 className="text-3xl font-bold text-temple-red uppercase mb-1">{member.name}</h2>
            <p className="text-gray-300 text-lg mb-4">{member.role}</p>

            <div className="w-full bg-gray-700 h-px mb-4"></div> {/* Separator */}

            <div className="text-left w-full mb-4">
              <p className="text-gray-400 mb-1">EMAIL:</p>
              <a href={`mailto:${member.email}`} className="text-blue-400 hover:text-blue-300 underline">{member.email}</a>
            </div>

            <div className="flex space-x-4 mt-2 mb-4">
              {member.google_scholar && (
                <a href={member.google_scholar} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-700 text-white border border-gray-500 hover:bg-gray-600 transition-colors text-sm">GOOGLE SCHOLAR</a>
              )}
              {member.cv && (
                <a href={member.cv} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-700 text-white border border-gray-500 hover:bg-gray-600 transition-colors text-sm">CV</a>
              )}
            </div>

            <div className="w-full bg-gray-700 h-px mb-4"></div> {/* Separator */}

            <div
              className="text-gray-200 text-sm mt-4 text-left leading-relaxed w-full"
              dangerouslySetInnerHTML={{ __html: member.contentHtml }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
