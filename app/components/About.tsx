import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
          <Header currentPage="about" />

          {/* Main content */}
          <main className="mt-16">
            {/* Responsive layout: photo left/text right on desktop, photo top/text bottom on mobile */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-8 lg:space-y-0">
              {/* Photo section */}
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <div className="w-full max-w-sm mx-auto lg:mx-0">
                  <div className="relative">
                    <Image
                      src="/profile-photo.jpg"
                      alt="Karun Agarwal"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                  {/* Photo caption */}
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span>Software Engineer & Pet Parent</span>
                  </div>
                </div>
              </div>

              {/* Bio text section */}
              <div className="flex-1 lg:pt-4">
                <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                  Hey. I am Karun, a 22 yo software engineer based in India. 
                  I skipped college to pursue my passion for solving real-world complex 
                  problems using technology. Most recently, I worked at{" "}
                  <a 
                    href="https://www.olakrutrim.com" 
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Krutrim
                  </a>{" "}
                  as the youngest Principal Engineer. Currently, I am building in the voice AI and synthetic humans space.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
