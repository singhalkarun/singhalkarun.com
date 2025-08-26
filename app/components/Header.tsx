"use client";

interface HeaderProps {
  currentPage: "about" | "history" | "interests" | "experience" | "projects";
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
        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center space-x-8 lg:space-x-12">
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
            onClick={() => scrollToSection('history')}
            className={`text-lg font-medium transition-colors duration-200 ${
              currentPage === "history" 
                ? "text-gray-900" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            History
          </button>
          <button 
            onClick={() => scrollToSection('interests')}
            className={`text-lg font-medium transition-colors duration-200 ${
              currentPage === "interests" 
                ? "text-gray-900" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Interests
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

        {/* Mobile Navigation - 2 Lines */}
        <nav className="md:hidden">
          {/* First line: About, History, Interests */}
          <div className="flex justify-center space-x-6 mb-3">
            <button 
              onClick={() => scrollToSection('about')}
              className={`text-base font-medium transition-colors duration-200 ${
                currentPage === "about" 
                  ? "text-gray-900" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('history')}
              className={`text-base font-medium transition-colors duration-200 ${
                currentPage === "history" 
                  ? "text-gray-900" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              History
            </button>
            <button 
              onClick={() => scrollToSection('interests')}
              className={`text-base font-medium transition-colors duration-200 ${
                currentPage === "interests" 
                  ? "text-gray-900" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Interests
            </button>
          </div>
          
          {/* Second line: Experience, Projects */}
          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => scrollToSection('experience')}
              className={`text-base font-medium transition-colors duration-200 ${
                currentPage === "experience" 
                  ? "text-gray-900" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`text-base font-medium transition-colors duration-200 ${
                currentPage === "projects" 
                  ? "text-gray-900" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Projects
            </button>
          </div>
        </nav>
      </header>
  );
}
