import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-dark-gray text-white">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-4">
            <Image src="/images/logo.png" alt="Temple CPE Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold">Temple CPE</span>
          </Link>
          <div className="space-x-6">
            <Link href="/publications" className="hover:text-temple-red transition-colors">Publications</Link>
            <Link href="/team" className="hover:text-temple-red transition-colors">Team</Link>
            <Link href="/news" className="hover:text-temple-red transition-colors">News</Link>
            <Link href="/software" className="hover:text-temple-red transition-colors">Software</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
