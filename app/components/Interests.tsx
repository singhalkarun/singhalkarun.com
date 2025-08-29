import Image from "next/image";
import ImageCaption from "./ImageCaption";

export default function Interests() {
  return (
    <section id="interests" className="mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Interests</h2>
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
              text="Music & Pets" 
              hoverText="Music is my soul's language. I dream of the day I'll stand on stage, guitar in hand, and make 'Sham' come alive for everyone to feel!"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 order-2 lg:order-2">
          <div className="space-y-6">
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-800">
            I grew up surrounded by pets, and today I share my home with two cats, Mia and Tia, who keep life playful and grounded
            </p>
            
            <div className="text-xl lg:text-2xl leading-relaxed text-gray-800 group relative">
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
            I love exploring new cultures and have lived across cities like Nainital, Kota, Delhi, Mumbai, and now Bangalore - each place shaping a piece of who I am
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
