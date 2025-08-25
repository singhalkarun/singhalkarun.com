import Link from "next/link";

interface HeaderProps {
  currentPage: "about" | "experience" | "projects";
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 pb-6 mb-12">
      <nav className="flex justify-center space-x-12">
        <Link 
          href="/" 
          className={`text-lg font-medium transition-colors duration-200 ${
            currentPage === "about" 
              ? "text-gray-900" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          About
        </Link>
        <Link 
          href="/experience" 
          className={`text-lg font-medium transition-colors duration-200 ${
            currentPage === "experience" 
              ? "text-gray-900" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Experience
        </Link>
        <Link 
          href="/projects" 
          className={`text-lg font-medium transition-colors duration-200 ${
            currentPage === "projects" 
              ? "text-gray-900" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Projects
        </Link>
      </nav>
    </header>
  );
}
