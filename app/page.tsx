"use client";

import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import History from "./components/History";
import Interests from "./components/Interests";
import Connect from "./components/Connect";
import ImageCaption from "./components/ImageCaption";
import ModeToggle from "./components/ModeToggle";
import { content, experienceData, projectsData } from "./data/content";
import { useMode } from "./contexts/ModeContext";

export default function Home() {
  const { mode } = useMode();
  const currentContent = content[mode];
  const currentExperiences = experienceData[mode];
  const currentProjects = projectsData[mode];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Mode Toggle - Top Right Outside Content */}
      <div className="hidden md:block fixed top-6 right-6 lg:right-8 z-50">
        <ModeToggle />
      </div>
      
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pb-12 md:pb-32">
          <Header />

          {/* Main H1 for SEO */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 mt-8">
            {currentContent.hero.title}
          </h1>

          {/* Tagline */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center mb-12">
            {currentContent.hero.tagline}
          </h2>

          {/* About Section */}
          <section id="about" className="mt-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">{mode === 'cat' ? 'About My Servant' : 'About'}</h3>
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-8 lg:space-y-0">
              {/* Photo section */}
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <div className="w-full max-w-sm mx-auto lg:mx-0">
                  <div className="relative">
                    <Image
                      src="/profile-photo.jpg"
                      alt="Karun Agarwal with his cat, software engineer based in India"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                  <ImageCaption 
                    text={currentContent.hero.imageCaption.text} 
                    hoverText={currentContent.hero.imageCaption.hoverText}
                  />
                </div>
              </div>

              {/* Bio text section */}
              <div className="flex-1 lg:pt-4">
                    <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                      {mode === 'human' ? (
                        <>
                          {currentContent.hero.bio.split(' Krutrim ')[0]}{" "}
                          <a 
                            href="https://www.olakrutrim.com" 
                            className="text-black hover:text-gray-700 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Krutrim
                          </a>{" "}
                          {currentContent.hero.bio.split(' Krutrim ')[1]}
                        </>
                      ) : (
                        <>
                          {currentContent.hero.bio.split(' Krutrim ')[0]}{" "}
                          <a 
                            href="https://www.olakrutrim.com" 
                            className="text-black hover:text-gray-700 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Krutrim
                          </a>{" "}
                          {currentContent.hero.bio.split(' Krutrim ')[1]}
                        </>
                      )}
                    </p>
              </div>
            </div>
          </section>

          {/* History Section */}
          <History />

          {/* Interests Section */}
          <Interests />

          {/* Experience Section */}
          <section id="experience" className="mt-24">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">{currentContent.experience.title}</h3>
            <div className="space-y-12">
              {currentExperiences.map((exp, index) => (
                <Experience
                  key={index}
                  company={exp.company}
                  designation={exp.designation}
                  duration={exp.duration}
                  companyUrl={exp.companyUrl}
                  points={exp.points}
                />
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mt-24">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">{currentContent.projects.title}</h3>
            <div className="space-y-12">
              {currentProjects.map((project, index) => (
                <div key={index} className="pb-12 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-700 underline transition-colors duration-200"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Connect Section */}
          <Connect />
        </div>
      </div>
      <Footer />
    </div>
  );
}