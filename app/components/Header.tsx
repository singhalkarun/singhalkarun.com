"use client";

interface NavButtonProps {
  sectionId: string;
  label: string;
  isActive: boolean;
  size?: "base" | "lg";
  onClick: (sectionId: string) => void;
}

function NavButton({ sectionId, label, isActive, size = "lg", onClick }: NavButtonProps) {
  const sizeClass = size === "lg" ? "text-lg" : "text-base";
  
  return (
    <button 
      onClick={() => onClick(sectionId)}
      className={`${sizeClass} font-medium duration-200 cursor-pointer focus:outline-none focus:ring-0 focus:border-none focus:ring-offset-0 focus:ring-transparent ${
        isActive 
          ? "text-gray-900" 
          : "text-gray-600 hover:text-gray-900"
      }`}
      style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
    >
      {label}
    </button>
  );
}

interface HeaderProps {
  currentPage: "about" | "history" | "interests" | "experience" | "projects" | "connect";
}

export default function Header({ currentPage }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'history', label: 'History' },
    { id: 'interests', label: 'Interests' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'connect', label: 'Connect' }
  ];

  return (
    <header className="border-b border-gray-200 pb-6 mb-12">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center space-x-8 lg:space-x-12">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            sectionId={item.id}
            label={item.label}
            isActive={currentPage === item.id}
            onClick={scrollToSection}
          />
        ))}
      </nav>

        {/* Mobile Navigation - 3 Lines */}
        <nav className="md:hidden">
          {/* First line: About, History, Interests */}
          <div className="flex justify-center space-x-6 mb-3">
            {navItems.slice(0, 3).map((item) => (
              <NavButton
                key={item.id}
                sectionId={item.id}
                label={item.label}
                isActive={currentPage === item.id}
                size="base"
                onClick={scrollToSection}
              />
            ))}
          </div>
          
          {/* Second line: Experience, Projects */}
          <div className="flex justify-center space-x-6 mb-3">
            {navItems.slice(3, 5).map((item) => (
              <NavButton
                key={item.id}
                sectionId={item.id}
                label={item.label}
                isActive={currentPage === item.id}
                size="base"
                onClick={scrollToSection}
              />
            ))}
          </div>

          {/* Third line: Connect */}
          <div className="flex justify-center space-x-6">
            {navItems.slice(5).map((item) => (
              <NavButton
                key={item.id}
                sectionId={item.id}
                label={item.label}
                isActive={currentPage === item.id}
                size="base"
                onClick={scrollToSection}
              />
            ))}
          </div>
        </nav>
      </header>
  );
}
