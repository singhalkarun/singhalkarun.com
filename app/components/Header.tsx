import Link from "next/link";

interface HeaderProps {
  currentPage: "about" | "experience";
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 pb-6 mb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
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
        </div>
        <nav>
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
        </nav>
      </div>
    </header>
  );
}
