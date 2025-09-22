"use client";

import Image from "next/image";
import ImageCaption from "./ImageCaption";
import { content } from "../data/content";
import { useMode } from "../contexts/ModeContext";

export default function History() {
  const { mode } = useMode();
  const currentContent = content[mode];
  return (
    <section id="history" className="mt-24">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">{currentContent.history.title}</h3>
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Image section */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 order-1 lg:order-2">
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative">
              <Image
                src="/rack-server.jpeg"
                alt="Technology Journey"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <ImageCaption 
              text={currentContent.history.imageCaption.text} 
              hoverText={currentContent.history.imageCaption.hoverText}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 order-2 lg:order-1 lg:pr-6">
          <div className="space-y-6">
            {currentContent.history.paragraphs.map((paragraph, index) => (
              <div key={index} className={index === 0 ? "relative group" : ""}>
                <div className="text-xl lg:text-2xl leading-relaxed text-gray-800">
                  {paragraph}
                </div>
                
                {/* Hover popup only for first paragraph in human mode */}
                {index === 0 && mode === 'human' && (
                  <div className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-lg border border-gray-700 max-w-xs break-words">
                    Want to see the game that made me skip meals? This retro masterpiece was my first taste of digital obsession! Check{" "}
                    <a 
                      href="https://archive.org/details/mac_Lode_Runner" 
                      className="text-blue-300 hover:text-blue-100 underline focus:ring-0 focus:outline-none focus:border-0 focus:shadow-none pointer-events-auto"
                      style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      this
                    </a>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
