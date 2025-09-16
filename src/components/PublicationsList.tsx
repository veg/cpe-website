"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

type Publication = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  date: string; // Assuming date is available for sorting
  keywords?: string[];
};

export default function PublicationsList({ publications }: { publications: Publication[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedPublications = useMemo(() => {
    return [...publications].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === 'newest') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }, [publications, sortOrder]);

  const filteredPublications = useMemo(() => {
    return sortedPublications.filter(pub =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.keywords && pub.keywords.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, sortedPublications]);

  const allSuggestions = useMemo(() => {
    const titles = publications.map(pub => pub.title);
    const authors = publications.flatMap(pub => pub.authors.split(', ').map(author => author.trim()));
    const keywords = publications.flatMap(pub => pub.keywords || []);
    return Array.from(new Set([...titles, ...authors, ...keywords]));
  }, [publications]);

  const autocompleteSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(lowerCaseSearchTerm)
    ).slice(0, 10); // Limit to 10 suggestions
  }, [searchTerm, allSuggestions]);

  const displayAuthors = (authors: string) => {
    const authorList = authors.split(', ').map(author => author.trim());
    if (authorList.length > 7) {
      const firstFive = authorList.slice(0, 5);
      const lastTwo = authorList.slice(-2);
      return `${firstFive.join(', ')}, ..., ${lastTwo.join(', ')}`;
    } else {
      return authors;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by title, author, or keyword"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            list="suggestions"
          />
          <datalist id="suggestions">
            {autocompleteSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        </div>
        <select
          className="p-2 border border-gray-300 rounded-lg"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="mb-4 text-gray-700">
        Displaying {filteredPublications.length} of {publications.length} publications
      </div>

      <div className="space-y-4">
        {filteredPublications.length === 0 ? (
          <p>No publications found matching your criteria.</p>
        ) : (
                      filteredPublications.map((pub, index) => (
            <div key={pub.id} className={`border-b border-gray-300 py-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <Link href={`/publications/${pub.id}`} className="block text-blue-600 hover:underline font-medium">
                {pub.title}
              </Link>
              <p className="text-sm text-gray-700">{displayAuthors(pub.authors)}</p>
              <p className="text-sm text-gray-700 font-mono">{pub.journal} ({pub.year})</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
