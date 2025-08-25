import Header from "./Header";
import Footer from "./Footer";

interface Project {
  title: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Scribbl - Multiplayer Drawing Game",
    description: "A real-time multiplayer drawing and guessing game inspired by Skribbl.io. Players take turns drawing words while others compete to guess correctly and earn points.",
    link: "https://github.com/singhalkarun/scribbl"
  }
  
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Header currentPage="projects" />

          {/* Main content */}
          <main className="mt-16">

            {/* Projects grid */}
            <div className="space-y-8">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    <span className="mr-2">View Project</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>


          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
