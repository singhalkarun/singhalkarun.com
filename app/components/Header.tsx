"use client";

interface HeaderProps {
  currentPage: "about" | "experience" | "projects";
}

export default function Header({ currentPage }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-gray-200 pb-6 mb-12">
      <nav className="flex justify-center space-x-12">
        <button 
          onClick={() => scrollToSection('about')}
          className={`text-lg font-medium transition-colors duration-200 ${
            currentPage === "about" 
              ? "text-gray-900" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('experience')}
          className={`text-lg font-medium transition-colors duration-200 ${
            currentPage === "experience" 
              ? "text-gray-900" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Experience
        </button>
        <button 
          onClick={() => scrollToSection('projects')}
          className={`text-lg font-medium transition-colors duration-200 ${
            currentPage === "projects" 
              ? "text-gray-900" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Projects
        </button>
      </nav>
    </header>
  );
}
