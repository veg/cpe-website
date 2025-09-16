const Footer = () => {
  return (
    <footer className="bg-dark-gray text-gray-300 mt-8">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Temple Center for Pathogen Evolution
        </p>
        {/* Add social media links here later */}
      </div>
    </footer>
  );
};

export default Footer;