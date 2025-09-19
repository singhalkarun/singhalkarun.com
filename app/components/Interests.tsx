"use client";

import Image from "next/image";
import ImageCaption from "./ImageCaption";
import { useMode } from "../contexts/ModeContext";
import { catModeTexts, humanModeTexts } from "../utils/textTransform";

export default function Interests() {
  const { isCatMode } = useMode();
  const texts = isCatMode ? catModeTexts : humanModeTexts;
  
  return (
    <section id="interests" className="mt-24">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">{texts.interestsTitle}</h3>
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Image section */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 order-1 lg:order-1">
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative">
              <Image
                src="/pets-and-music.jpeg"
                alt="Cat and Guitar"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <ImageCaption 
              text={texts.interestsCaption} 
              hoverText={texts.interestsHover}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 order-2 lg:order-2">
          <div className="space-y-6">
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
              {texts.interestsContent1}
            </p>
            
            <div className="text-xl lg:text-2xl leading-relaxed text-gray-800 group relative">
              {isCatMode ? (
                <>
                  {texts.interestsContent2.split('Ukulele')[0]}
                  <a 
                    href="https://www.instagram.com/p/DLK1x_ezXn69n8oJT0Ca9edrmcmL-pezSpUmFs0/" 
                    className="text-black hover:text-gray-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ukulele
                  </a>
                  {texts.interestsContent2.split('Ukulele')[1]}
                </>
              ) : (
                <>
                  I love Music and been learning to play{" "}
                  <a 
                    href="https://www.instagram.com/p/DLK1x_ezXn69n8oJT0Ca9edrmcmL-pezSpUmFs0/" 
                    className="text-black hover:text-gray-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ukulele
                  </a>{" "}
                  and recently learnt to play Sham, one of my favorite songs
                </>
              )}
              
              {/* Hover popup */}
              <div className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-200 pointer-events-auto z-20 shadow-lg border border-gray-700 max-w-xs break-words">
                Curious to know what made me interested in Ukulele? Check{" "}
                <a 
                  href="https://www.youtube.com/watch?v=5MgBikgcWnY&t=70s" 
                  className="text-blue-300 hover:text-blue-100 underline focus:ring-0 focus:outline-none focus:border-0 focus:shadow-none"
                  style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this
                </a>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>

            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
              {texts.interestsContent3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
